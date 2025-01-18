import { Component, ViewChild } from '@angular/core';
import { CartItem, CartService } from '../cart.service';
import { IonContent, LoadingController, ToastController } from '@ionic/angular';
import { AuthService } from '../auth.service';
import { AccessibilityService } from '../accessibility.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage {
  @ViewChild(IonContent) content!: IonContent;

  showCheckout: boolean = false;
  showConfirmation: boolean = false;
  checkoutUrl: string = '';

  cartItems: CartItem[] = [];

  checkoutInfo: any;

  isLoading: boolean = false;

  constructor(
    private readonly cartService: CartService,
    private toastController: ToastController,
    private loadingController: LoadingController,
    private authService: AuthService,
    private accessibilityService: AccessibilityService
  ) {}

  ngOnInit(): void {
    this.cartService.cart$.subscribe((cart) => {
      this.cartItems = cart;
    });
  }

  async checkout() {
    this.isLoading = true;
    const loading = await this.loadingController.create({
      message: 'Processing Checkout...',
      spinner: 'crescent',
    });
    await loading.present();

    this.checkoutInfo = {
      cart: this.cartItems,
      user_info: this.authService.getCurrentUser(),
    };
    this.showCheckout = true;
    loading.dismiss();
    this.accessibilityService.announce('Checkout process started.', 'polite');
  }

  removeCheckout() {
    this.showCheckout = false;
    this.accessibilityService.announce('Returned to cart.', 'polite');
  }

  async onOrderPlaced() {
    this.showCheckout = false;
    await this.presentToast('Your order has been placed successfully!');
    this.resetCart();
    this.scrollToTop();
    this.accessibilityService.announce(
      'Your order was placed successfully.',
      'polite'
    );
  }

  scrollToTop() {
    this.content.scrollToTop(500);
  }

  async presentToast(message: string, color: string = 'success') {
    const toast = await this.toastController.create({
      message: message,
      duration: 3000,
      color: color,
      position: 'bottom',
    });
    await toast.present();
  }

  resetCart() {
    this.cartService.clearCart();
    this.cartItems = [];
    this.checkoutInfo = null;
    this.accessibilityService.announce('Your cart has been cleared.', 'polite');
  }
}
