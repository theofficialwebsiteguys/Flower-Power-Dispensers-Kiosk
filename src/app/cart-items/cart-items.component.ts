import { Component, OnInit } from '@angular/core';
import { CartItem, CartService } from '../cart.service';

@Component({
  selector: 'app-cart-items',
  templateUrl: './cart-items.component.html',
  styleUrls: ['./cart-items.component.scss'],
})
export class CartItemsComponent implements OnInit {

  cartItems: CartItem[] = [];

  constructor(private readonly cartService: CartService){}

  ngOnInit(): void {
    this.cartService.cart$.subscribe((cart) => {
      this.cartItems = cart;
    });
  }

  updateQuantity(item: CartItem, delta: number): void {
    this.cartService.updateQuantity(item.id, item.quantity + delta);
  }

  calculateSubtotal(): number {
    return this.cartItems.reduce(
      (total, item) => total + Number(item.price) * item.quantity,
      0
    );
  }

}
