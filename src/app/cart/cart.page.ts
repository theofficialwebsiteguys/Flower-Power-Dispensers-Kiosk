import { Component, ViewChild } from '@angular/core';
import { CartItem, CartService } from '../cart.service';
import { IonContent, LoadingController, ToastController } from '@ionic/angular';
import { AuthService } from '../auth.service';

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

  constructor(private readonly cartService: CartService,  private toastController: ToastController, private loadingController: LoadingController, private authService: AuthService){}

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

    this.checkoutInfo = { cart: this.cartItems, user_info: this.authService.getCurrentUser() }
    this.showCheckout = true; 
    loading.dismiss();

    // this.cartService.checkout().subscribe(
    //   (response) => {
    //     loading.dismiss();
    //     this.isLoading = false;  
    //     this.checkoutInfo = response;
    //     this.showCheckout = true; 
    //   },
    //   (error) => {
    //     loading.dismiss();
    //     this.isLoading = false; 
    //     console.error('Error during checkout:', error);
    //     this.showCheckout = false; 
    //   }
    // );
  }

  removeCheckout(){
    this.showCheckout = false;
  }

  async onOrderPlaced() {
    this.showCheckout = false;
    await this.presentToast('Your order has been placed successfully!');
    this.resetCart();
    this.scrollToTop();  // Scroll to the top of the page
  }
  
  scrollToTop() {
    this.content.scrollToTop(500);  // Smooth scroll over 500ms
  }
  

  async presentToast(message: string, color: string = 'success') {
    const toast = await this.toastController.create({
      message: message,
      duration: 3000,
      color: color,
      position: 'bottom'
    });
    await toast.present();
  }

  // Reset cart and checkout after confirmation
  resetCart() {
    this.cartService.clearCart(); // Assuming a clearCart method exists
    this.cartItems = [];
    this.checkoutInfo = null;
  }

}
