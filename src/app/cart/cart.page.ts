import { Component } from '@angular/core';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage {

  showCheckout: boolean = false;
  checkoutUrl: string = '';

  constructor(private cartService: CartService) { }

  checkout(){
    this.checkoutUrl = this.cartService.checkout();
    this.showCheckout = true; 
  }

  removeCheckout(){
    this.showCheckout = false;
  }

}
