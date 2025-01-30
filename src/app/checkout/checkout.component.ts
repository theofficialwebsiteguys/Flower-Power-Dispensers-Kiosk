import { Location } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CartService } from '../cart.service';
import { LoadingController } from '@ionic/angular';
import { AccessibilityService } from '../accessibility.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
})
export class CheckoutComponent implements OnInit {
  @Input() checkoutInfo: any;
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

  selectedPaymentMethod: string = '';

  @Output() back: EventEmitter<void> = new EventEmitter<void>();
  @Output() orderPlaced = new EventEmitter<void>();

  constructor(
    private readonly location: Location,
    private cartService: CartService,
    private loadingController: LoadingController,
    private accessibilityService: AccessibilityService
  ) {}

  ngOnInit() {
    this.calculateDefaultTotals();
    this.generateTimeOptions();

    window.AeroPay.init({
      env: 'staging',
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

    const aeroPayButton = document.getElementById('aeropay-button-container');
    if (aeroPayButton) {
      aeroPayButton.addEventListener('click', () => {
        ap.launch(this.finalTotal.toFixed(2));
      });
    }
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
    this.finalSubtotal = this.checkoutInfo.cart.reduce(
      (total: number, item: any) => total + item.price,
      0
    );
    this.finalTax = this.finalSubtotal * 0.13;
    this.finalTotal = this.finalSubtotal + this.finalTax;
  }

  updateTotals() {
    const pointsValue = this.pointsToRedeem * this.pointValue;
    const originalSubtotal = this.checkoutInfo.cart.reduce(
      (total: number, item: any) => total + item.price,
      0
    );
    this.finalSubtotal = originalSubtotal - pointsValue;
    if (this.finalSubtotal < 0) this.finalSubtotal = 0;
    this.finalTax = this.finalSubtotal * 0.13;
    this.finalTotal = this.finalSubtotal + this.finalTax;

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
        console.log('Final Response: ' + response);
        pos_order_id = response.id_order;
        points_add = response.subtotal;

        console.log('Order Placed Successfully', response);

        this.cartService
          .placeOrder(
            user_id,
            pos_order_id,
            points_redeem ? 0 : points_add,
            points_redeem
          )
          .subscribe({
            next: () => {
              console.log('Order placed successfully!');
              loading.dismiss();
              this.isLoading = false;
              this.orderPlaced.emit();
              this.accessibilityService.announce(
                'Your order has been placed successfully.',
                'polite'
              );
            },
            error: (error) => {
              loading.dismiss();
              this.isLoading = false;
              console.error('Error placing order:', error);
              this.accessibilityService.announce(
                'There was an error placing your order. Please try again.',
                'polite'
              );
            },
          });
      },
      (error) => {
        loading.dismiss();
        this.isLoading = false;
        console.error('Error during checkout:', error);
        this.accessibilityService.announce(
          'Checkout failed. Please try again.',
          'polite'
        );
      }
    );
  }
}
