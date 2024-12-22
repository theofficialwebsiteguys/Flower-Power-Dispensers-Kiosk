import { Component, Input, OnInit } from '@angular/core';

import { ProductsService } from '../products.service';

import { Product } from './product.model';
import { CartItem, CartService } from '../cart.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {
  constructor(private productService: ProductsService, private cartService: CartService, private authService: AuthService) {}

  @Input() product: Product = {
    id: '',
    category: 'FLOWER',
    title: '',
    brand: '',
    desc: '',
    strainType: 'HYBRID',
    thc: '',
    weight: '',
    price: '',
    image: '',
  };

  quantity = 1;
  isLoggedIn: boolean = false;

  ngOnInit() {
    this.authService.isLoggedIn().subscribe(status => this.isLoggedIn = status);
  }

  ngOnDestroy(){
    this.quantity = 1;
  }

  updateProductDisplay() {
    this.productService.updateCurrentProduct(this.product);
  }

  adjustQuantity(amount: number, event?: Event) {
    if (event) {
      event.stopPropagation();
    }
    this.quantity = Math.max(1, this.quantity + amount);
  }

  addToCart(event?: Event) {
    if (event) {
      event.stopPropagation();
    }
    const cartItem: CartItem = { ...this.product, quantity: this.quantity };
    this.cartService.addToCart(cartItem);
    alert('Item added to cart!');
  }
}
