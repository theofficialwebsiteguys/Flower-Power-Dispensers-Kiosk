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

  checkout(){
    this.checkoutUrl = this.cartService.checkout();
    this.showCheckout = true; 
  }

  removeCheckout(){
    this.showCheckout = false;
  }

}
