import { Component } from '@angular/core';
import { CartItem, CartService } from '../cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage {

  showCheckout: boolean = false;
  checkoutUrl: string = '';

  cartItems: CartItem[] = [];

  constructor(private readonly cartService: CartService){}

  ngOnInit(): void {
    this.cartService.cart$.subscribe((cart) => {
      this.cartItems = cart;
    });
  }

  checkout() {
    this.cartService.checkout().subscribe(
      (url) => {
        this.checkoutUrl = url; // Assign the generated URL
        this.showCheckout = true; // Display the checkout component
      },
      (error) => {
        console.error('Error during checkout:', error);
        this.showCheckout = false; // Ensure the checkout component does not display
      }
    );
  }
  removeCheckout(){
    this.showCheckout = false;
  }

}
