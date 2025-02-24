import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CartService } from '../cart.service';
import { LoadingController, ToastController } from '@ionic/angular';
import { AccessibilityService } from '../accessibility.service';
import { AuthService } from '../auth.service';
import { AeropayService } from '../aeropay.service';
import { openWidget } from 'aerosync-web-sdk';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
})
export class CheckoutComponent implements OnInit {
  @Input() checkoutInfo: any;

  deliveryAddress = {
    street: '',
    apt: '',
    city: '',
    zip: '',
    state: 'NY' // Default to New York and cannot be changed
  };
  
  isDatePickerOpen = false;
  selectedDate: string | null = null;
  pointsToRedeem: number = 0;

  showTooltip = false;
  applyPoints: boolean = false;

  finalSubtotal: number = 0;
  finalTotal: number = 0;
  finalTax: number = 0;

  pointValue: number = 0.05;

  selectedTime: string = '';

  isLoading: boolean = false;

  timeOptions: { value: string; display: string }[] = [];

  selectedPaymentMethod: string = 'cash';

  selectedOrderType: string = 'retail';

  aeropayButtonInstance: any;

  enableDelivery: boolean = false;

  aeropayAuthToken: string | null = null;

  verificationRequired: boolean = false;
  verificationCode: string = '';
  existingUserId: string = '';

  aerosyncURL: string | null = null;
  aerosyncToken: string | null = null;
  aerosyncUsername: string | null = null;
  showAerosyncWidget: boolean = false;

  userBankAccounts: any[] = []; // Store user bank accounts
  showBankSelection: boolean = false; // Control UI visibility
  selectedBankId: string | null = null; // Track selected bank

  isFetchingAeroPay: boolean = false; 

  bankLinked: boolean = false;
  aeropayUserId: any;

  loadingAerosync = false;

  originalUserInfo: any = null; // Store initial user info

  showAeropay: boolean = true;
  
  @Output() back: EventEmitter<void> = new EventEmitter<void>();
  @Output() orderPlaced = new EventEmitter<void>();
  isGuest: boolean = false;

  originalUserId: number = 0;
  userRole: any;

  constructor(
    private cartService: CartService,
    private loadingController: LoadingController,
    private accessibilityService: AccessibilityService,
    private toastController: ToastController,
    private authService: AuthService,
    private aeropayService: AeropayService,
    private router: Router
  ) {}

  ngOnInit() {
    this.calculateDefaultTotals();
    this.generateTimeOptions();

    this.authService.guest$.subscribe(value => {
      this.isGuest = value;
      this.showAeropay = false;
      console.log(value)
    });

    this.originalUserId = this.checkoutInfo.user_info.id

    if(this.checkoutInfo.user_info.role === 'employee'){
      this.showAeropay = false;
    } else if(this.checkoutInfo.user_info.role === 'customer'){
      this.showAeropay = true
    }

    this.authService.getUserInfo().subscribe((user: any) => {
      if (user) {
        this.userRole = user.role;
      }
    });

    this.originalUserInfo = { ...this.checkoutInfo.user_info };

    this.checkoutInfo.user_info = {
      fname: '',
      lname: '',
      email: '',
      phone: '',
      dob: '',
    };

  }

  async startAeroPayProcess() {
    console.log('Checking if AeroPay Token is valid...');
    this.isFetchingAeroPay = true;
  
      this.aeropayService.fetchMerchantToken().subscribe({
        next: (response: any) => {
  
          if (response.success === false || !response.token) {
            console.error('AeroPay Authentication Failed:', response.error);
            this.presentToast(`Authentication Error: ${response.error.message}`, 'danger');
            this.isFetchingAeroPay = false;
            return; 
          }

          this.createAeroPayUser();
        },
        error: (error: any) => {
          console.error('AeroPay Authentication Request Failed:', error);
          this.presentToast('Authentication request failed. Please try again.', 'danger');
          this.isFetchingAeroPay = false;
        }
      });
  }

  async createAeroPayUser() {
    const userData = {
      first_name: this.checkoutInfo.user_info.fname,
      last_name: this.checkoutInfo.user_info.lname,
      phone: this.checkoutInfo.user_info.phone,
      email: this.checkoutInfo.user_info.email
    };
  
    this.aeropayService.createUser(userData).subscribe({
      next: (response: any) => {
        this.isFetchingAeroPay = false;

        if (response.displayMessage) {
          this.verificationRequired = true;
          this.existingUserId = response.existingUser.userId; // Store userId for verification
          this.presentToast(response.displayMessage, 'warning');
        } else  {
          if (response.success && response.user) {
            this.userBankAccounts = response.user.bankAccounts || []; // Store bank accounts
            this.aeropayUserId = response.user.userId;
    
            if (this.userBankAccounts.length > 0) {
              this.showBankSelection = true; // Show bank selection UI
              this.selectedBankId = this.userBankAccounts[0].bankAccountId;
            } else {
              this.retrieveAerosyncCredentials();
            }
          }

        }
      },
      error: (error: any) => {
        console.error('Error Creating AeroPay User:', error);
        this.presentToast('Error creating user. Please try again.', 'danger');
        this.isFetchingAeroPay = false;
      }
    });
  }

  async verifyAeroPayUser() {
    if (!this.verificationCode.trim()) {
      this.presentToast('Please enter the verification code.', 'danger');
      return;
    }
  
  
    this.aeropayService.verifyUser(this.existingUserId, this.verificationCode).subscribe({
      next: (response: any) => {
        this.verificationRequired = false; // Hide verification input
        this.presentToast('Verification successful!', 'success');
        // Proceed with next stage (e.g., placing an order)
      },
      error: (error: any) => {
        console.error('Verification Failed:', error);
        this.presentToast('Invalid verification code. Please try again.', 'danger');
      }
    });
  }

  async retrieveAerosyncCredentials() {
    this.loadingAerosync = true;
    this.aeropayService.fetchUsedForMerchantToken(this.aeropayUserId).subscribe({
      next: (response: any) => {

        // **Check for API errors inside the response**
        if (response.success === false || !response.token) {
          console.error('AeroPay Authentication Failed:', response.error);
          this.presentToast(`Authentication Error: ${response.error.message}`, 'danger');
          this.loadingAerosync = false;
          return; // **Exit function to prevent further execution**
        }

        this.aeropayService.getAerosyncCredentials().subscribe({
          next: (response: any) => {
            if (response.success) {
              this.aerosyncURL = response.fastlinkURL;
              this.aerosyncToken = response.token;
              this.aerosyncUsername = response.username;
    
              this.openAerosyncWidget();
            } else {
              console.error('Failed to retrieve Aerosync widget.');
            }
            this.loadingAerosync = false;
          },
          error: (error: any) => {
            console.error('Error Retrieving Aerosync Widget:', error);
            this.loadingAerosync = false;
          }
        });
      },
      error: (error: any) => {
        console.error('AeroPay Authentication Request Failed:', error);
        this.presentToast('Authentication request failed. Please try again.', 'danger');
        this.loadingAerosync = false;
      }
    });
   
  }

  openAerosyncWidget() {
    if (!this.aerosyncToken) {
      console.error('Missing AeroSync Token');
      return;
    }

    let widgetRef = openWidget({
      id: "widget",
      iframeTitle: 'Connect',
      environment: 'production', // 'production' for live
      token: this.aerosyncToken,
      style: {
        width: '375px',
        height: '688px',
        bgColor: '#000000',
        opacity: 0.7
      },
      deeplink: "", // Leave empty if not needed
      consumerId: "", // Optional: Merchant customization

      onLoad: function () {
        console.log("AeroSync Widget Loaded");
      },
      onSuccess: (event: any) => {  
        if (event.user_id && event.user_password) {
          this.linkBankToAeropay(event.user_id, event.user_password);
        } else {
          console.error("Missing user credentials in event:", event);
        }
      },
      onError: function (event) {
        console.error("AeroSync Error:", event);
      },
      onClose: function () {
        console.log("AeroSync Widget Closed");
      },
      onEvent: function (event: object, type: string): void {
        console.log(event, type)
      }
    });

    // Launch the widget
    widgetRef.launch();
  }

  linkBankToAeropay(userId: string, userPassword: string) {
 
    this.aeropayService.linkBankAccount(userId, userPassword).subscribe({
      next: (response: any) => {
        if (response.success) {
          this.presentToast('Bank account linked successfully!', 'success');
  
          this.createAeroPayUser();
        } else {
          console.error('Failed to link bank:', response);
          this.presentToast('Failed to link your bank. Please try again.', 'danger');
        }
      },
      error: (error: any) => {
        console.error('Error linking bank account:', error);
        this.presentToast('An error occurred while linking your bank.', 'danger');
      }
    });
  }
  
  
  selectBank(bankId: string) {
    this.selectedBankId = bankId;
  }

  generateTimeOptions() {
    for (let hour = 8; hour <= 23; hour++) {
      const displayHour = hour % 12 === 0 ? 12 : hour % 12;
      const amPm = hour < 12 ? 'AM' : 'PM';
      const formattedHour = hour < 10 ? `0${hour}` : `${hour}`;
      this.timeOptions.push({
        value: `${formattedHour}:00`,
        display: `${displayHour}:00 ${amPm}`,
      });
    }
  }

  calculateDefaultTotals() {
    console.log(this.checkoutInfo.cart);
    this.finalSubtotal = this.checkoutInfo.cart.reduce(
      (total: number, item: any) => total + (item.price * item.quantity),
      0
    );
    this.finalTax = this.finalSubtotal * 0.13;
    this.finalTotal = this.finalSubtotal + this.finalTax;
    this.updateTotals();
  }

  updateTotals() {
    const pointsValue = this.pointsToRedeem * this.pointValue;
    const originalSubtotal = this.checkoutInfo.cart.reduce(
      (total: number, item: any) => total + (item.price * item.quantity),
      0
    );
    this.finalSubtotal = originalSubtotal - pointsValue;
    if (this.finalSubtotal < 0) this.finalSubtotal = 0;
    this.finalTax = this.finalSubtotal * 0.13;
    this.finalTotal = this.finalSubtotal + this.finalTax;
    if(this.finalTotal >= 90){
      this.enableDelivery = true;
    }

    this.accessibilityService.announce(
      `Subtotal updated to ${this.finalSubtotal.toFixed(2)} dollars.`,
      'polite'
    );
  }

  goBack() {
    this.back.emit();
    this.accessibilityService.announce(
      'Returned to the previous page.',
      'polite'
    );
  }

  toggleDatePicker() {
    this.isDatePickerOpen = !this.isDatePickerOpen;
    const message = this.isDatePickerOpen
      ? 'Date picker opened.'
      : 'Date picker closed.';
    this.accessibilityService.announce(message, 'polite');
  }

  toggleTooltip() {
    this.showTooltip = !this.showTooltip;
  }

  onDateSelected(event: any) {
    const date = new Date(event.detail.value);
    const options: Intl.DateTimeFormatOptions = {
      month: 'long',
      day: 'numeric',
    };
    this.selectedDate = date.toLocaleDateString(undefined, options);
    this.showTooltip = false;
    this.accessibilityService.announce(
      `Selected date is ${this.selectedDate}.`,
      'polite'
    );
  }

  async placeOrder() {
    this.isLoading = true;
    const loading = await this.loadingController.create({
      spinner: 'crescent',
      message: 'Please wait while we process your order...',
      cssClass: 'custom-loading',
    });
    await loading.present();
  
    try {

      if (this.isGuest) {
        console.log('User info changed, creating Alleaves customer...');
        const newUserData = {
          fname: this.checkoutInfo.user_info.fname,
          lname: this.checkoutInfo.user_info.lname,
          phone: this.checkoutInfo.user_info.phone,
          email: this.checkoutInfo.user_info.email,
          dob: '1990-01-01'
        };
  
        const alleavesResponse = await this.cartService.createAlleavesCustomer(newUserData);
        
        if (alleavesResponse?.id_customer) {
          console.log('Alleaves Customer Created:', alleavesResponse.id_customer);
          this.checkoutInfo.user_info.alleaves_customer_id = alleavesResponse.id_customer; // Save the ID
        } else {
          console.warn('Failed to create Alleaves Customer');
        }
      }

      const user_id = this.checkoutInfo.user_info.id;
      console.log(this.checkoutInfo.user_info.alleaves_customer_id)
      const points_redeem = this.pointsToRedeem;
      let pos_order_id = 0;
      let points_add = 0;
  
      const deliveryAddress =
        this.selectedOrderType === 'delivery'
          ? {
              address1: this.deliveryAddress.street.trim(),
              address2: this.deliveryAddress.apt ? this.deliveryAddress.apt.trim() : null,
              city: this.deliveryAddress.city.trim(),
              state: this.deliveryAddress.state.trim(),
              zip: this.deliveryAddress.zip.trim(),
              delivery_date: new Date().toISOString().split('T')[0],
            }
          : null;

          if (this.selectedPaymentMethod === 'aeropay' && this.selectedBankId) {
            this.aeropayService.fetchUsedForMerchantToken(this.aeropayUserId).subscribe({
              next: async (response: any) => {
                const transactionResponse = await this.aeropayService.createTransaction(
                  this.finalTotal.toFixed(2), // Convert total to string
                  this.selectedBankId
                ).toPromise();
          
                if (!transactionResponse || !transactionResponse.success) {
                  console.error('AeroPay Transaction Failed:', transactionResponse);
                  this.presentToast('Payment failed. Please try again.', 'danger');
                  this.isLoading = false;
                  await loading.dismiss();
                  return;
                }
          
                this.presentToast('Payment successful!', 'success');
              },
              error: (error: any) => {
                console.log('Error:', error);
                this.presentToast('Error', 'danger');
              }
            });
           
          }
  
      const response = await this.cartService.checkout(points_redeem, this.selectedOrderType, deliveryAddress, this.checkoutInfo.user_info.alleaves_customer_id);
  
      pos_order_id = response.id_order;
      points_add = response.subtotal;

     
      await this.cartService.placeOrder(this.originalUserId, pos_order_id, points_redeem ? 0 : points_add, points_redeem, this.finalSubtotal, this.checkoutInfo.cart);
  
      this.orderPlaced.emit();

      if(this.userRole === 'employee' && !this.isGuest){
        this.router.navigateByUrl('/rewards')
      } else{
        this.authService.logout();
      }

      
      this.accessibilityService.announce('Your order has been placed successfully.', 'polite');
    } catch (error:any) {
      console.error('Error placing order:', error);
      await this.presentToast('Error placing order: ' + JSON.stringify(error.message));
      this.accessibilityService.announce('There was an error placing your order. Please try again.', 'polite');
    } finally {
      this.isLoading = false;
      await loading.dismiss();
    }
  }

  hasUserInfoChanged(): boolean {
    if (!this.originalUserInfo) return false;
  
    return (
      this.originalUserInfo.fname !== this.checkoutInfo.user_info.fname ||
      this.originalUserInfo.lname !== this.checkoutInfo.user_info.lname ||
      this.originalUserInfo.phone !== this.checkoutInfo.user_info.phone ||
      this.originalUserInfo.email !== this.checkoutInfo.user_info.email ||
      this.originalUserInfo.dob !== this.checkoutInfo.user_info.dob
    );
  }

  async presentToast(message: string, color: string = 'danger') {
    const toast = await this.toastController.create({
      message: message,
      duration: 5000,
      color: color,
      position: 'bottom',
    });
    await toast.present();
  }

  onOrderTypeChange(event: any) {
    this.selectedOrderType = event.detail.value;
    if(this.selectedOrderType === 'delivery'){
      this.selectedPaymentMethod = 'aeropay'
      this.startAeroPayProcess();
    }
  }

  onPaymentMethodChange(selectedMethod: string) {
    if (selectedMethod === 'aeropay') {
      this.startAeroPayProcess();
    }else{
      this.showBankSelection = false;
    }
  }

}
