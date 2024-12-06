import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

import { ProductsService } from '../products.service';

import { Product } from '../product/product.model';
import { CartService } from '../cart.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-single-product',
  templateUrl: './single-product.component.html',
  styleUrls: ['./single-product.component.scss'],
})
export class SingleProductComponent implements OnInit {
  currentProduct: Product = {
    id: '',
    category: '',
    title: '',
    brand: '',
    desc: '',
    strainType: 'HYBRID',
    thc: '',
    weight: '',
    price: '',
    image: '',
  };

  showFullDescription = false;
  quantity = 1; // Initialize quantity

  isLoggedIn: boolean = false;

  constructor(
    private productService: ProductsService,
    private cartService: CartService,
    private authService: AuthService,
    private location: Location,
    private router: Router
  ) {}

  ngOnInit() {
    this.productService.currentProduct$.subscribe((product) => {
      if (product) this.currentProduct = product;
      else this.router.navigateByUrl('/home');
    });

    this.authService.isLoggedIn().subscribe(status => {
      this.isLoggedIn = status;
    });
  }

  toggleDescription() {
    this.showFullDescription = !this.showFullDescription;
  }

  getDescription(): string {
    if (!this.currentProduct.desc) {
      return '';
    }
    return this.showFullDescription || this.currentProduct.desc.length <= 75
      ? this.currentProduct.desc
      : this.currentProduct.desc.substring(0, 75) + '...';
  }

  goBack() {
    this.location.back();
  }

   // Increment quantity
   incrementQuantity() {
    this.quantity++;
  }

  // Decrement quantity (ensure it doesn't go below 1)
  decrementQuantity() {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }

  // Add the current product to the cart
  addToCart() {
    const cartItem = {
      ...this.currentProduct,
      quantity: this.quantity,
    };

    this.cartService.addToCart(cartItem); // Use the CartService
    alert('Item added to cart!');
  }

}
