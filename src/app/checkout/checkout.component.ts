import { Location } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CartService } from '../cart.service';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
})
export class CheckoutComponent implements OnInit {
  @Input() checkoutInfo: any;
  isDatePickerOpen = false; // Controls calendar visibility
  selectedDate: string | null = null;
  pointsToRedeem: number = 0; 

  showTooltip = false;
  applyPoints: boolean = false;

  finalSubtotal: number = 0;
  finalTotal: number = 0;
  finalTax: number = 0;

  pointValue: number = 0.1;

  selectedTime: string = '';

  isLoading: boolean = false; 

  @Output() back: EventEmitter<void> = new EventEmitter<void>();
  @Output() orderPlaced = new EventEmitter<void>();

  constructor(private readonly location: Location, private cartService: CartService, private loadingController: LoadingController) {}

  ngOnInit() {
    this.calculateDefaultTotals();
  
    window.AeroPay.init({
      env: 'staging'
    });
  
    const ap = window.AeroPay.button({
      forceIframe: false,
      location: 'c7a33e4712',
      type: 'checkout',
      onSuccess: (uuid: string) => {
        console.log('Transaction successful:', uuid);
        this.placeOrder();
      },
      onError: (event: any) => {
        console.error('Transaction error:', event);
      },
    });
  
    ap.render('aeropay-button-container');
  
    // Attach click event to launch AeroPay with the correct amount
    const aeroPayButton = document.getElementById('aeropay-button-container');
    if (aeroPayButton) {
      aeroPayButton.addEventListener('click', () => {
        ap.launch(this.finalTotal.toFixed(2));  // Dynamic amount
      });
    }
  }
  

  calculateDefaultTotals() {
    this.finalSubtotal = this.checkoutInfo.cart.reduce((total: number, item: any) => total + item.price, 0);
    this.finalTax = this.finalSubtotal * 0.13;
    this.finalTotal = this.finalSubtotal + this.finalTax;
  }
  
  updateTotals() {
    const pointsValue = this.pointsToRedeem * this.pointValue;
  
    // Recalculate the subtotal by summing item prices in the cart
    const originalSubtotal = this.checkoutInfo.cart.reduce((total: number, item: any) => total + item.price, 0);
  
    // Apply the points discount to the subtotal
    this.finalSubtotal = originalSubtotal - pointsValue;
  
    // Prevent the subtotal from going below zero
    if (this.finalSubtotal < 0) {
      this.finalSubtotal = 0;
    }
  
    // Recalculate the tax based on the new subtotal (13% tax rate)
    this.finalTax = this.finalSubtotal * 0.13;
  
    // Calculate the final total
    this.finalTotal = this.finalSubtotal + this.finalTax;
  }
  

  goBack() {
    this.back.emit();
  }

  toggleDatePicker() {
    this.isDatePickerOpen = !this.isDatePickerOpen;
  }

  closeDatePicker() {
    this.isDatePickerOpen = false;
  }

  toggleTooltip() {
    this.showTooltip = !this.showTooltip;
  }
  

  onDateSelected(event: any) {
    const date = new Date(event.detail.value);
    const options: Intl.DateTimeFormatOptions = { month: 'long', day: 'numeric' };
    this.selectedDate = date.toLocaleDateString(undefined, options);
    this.showTooltip = false; // Hide the tooltip after selection
  }

  async placeOrder(){
    this.isLoading = true;
    const loading = await this.loadingController.create({
      message: 'Placing Order...',
      spinner: 'crescent',
    });
    await loading.present();

    const user_id = this.checkoutInfo.user_info.id;
    let pos_order_id = 0;
    let points_add = 0;
    const points_redeem = this.pointsToRedeem;

    this.cartService.checkout(points_redeem).subscribe(
      (response) => {
        console.log("Final Response: " + response)
        pos_order_id = response.id_order;
        points_add = response.subtotal;

        console.log('Order Placed Successfully', response);

        this.cartService.placeOrder(user_id, pos_order_id, points_redeem ? 0 : points_add, points_redeem).subscribe({
          next: () => {
            console.log('Order placed successfully!');
            loading.dismiss();
            this.isLoading = false;  
            this.orderPlaced.emit();  
            // Additional logic after placing the order (e.g., redirect, notification)
          },
          error: (error) => {
            loading.dismiss();
            this.isLoading = false;  
            console.error('Error placing order:', error);
            // Handle errors appropriately
          },
        });
      },
      (error) => {
        loading.dismiss();
        this.isLoading = false; 
        console.error('Error during checkout:', error);
      }
    );


    

  }
}
