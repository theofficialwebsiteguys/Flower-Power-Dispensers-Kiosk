import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

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
    category: 'FLOWER',
    title: '',
    brand: '',
    desc: '',
    strainType: 'HYBRID',
    thc: '',
    weight: '',
    price: '',
    quantity: 0,
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
    private router: Router,
    private toastController: ToastController // Inject ToastController
  ) {}

  ngOnInit() {
    this.productService.currentProduct$.subscribe((product) => {
      if (product) {
        this.currentProduct = product;
        this.quantity = 1; // Reset quantity when the product changes
      } else {
        this.router.navigateByUrl('/home');
      }
    });

    this.authService.isLoggedIn().subscribe(status => {
      this.isLoggedIn = status;
    });
  }

  ngOnDestroy(){
    this.quantity = 1;
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

  incrementQuantity() {
    if (this.quantity < this.currentProduct['quantity'] ) {
      this.quantity++;
    }
  }

  decrementQuantity() {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }

  async addToCart() {
    const cartItem = {
      ...this.currentProduct,
      quantity: this.quantity,
    };
  
    this.cartService.addToCart(cartItem); // Use the CartService
    alert('Item added to cart!');
  
    // // Display a toast message with a clickable button
    // const toast = await this.toastController.create({
    //   message: 'Item added to cart!',
    //   duration: 10000,
    //   position: 'bottom',
    //   cssClass: 'custom-toast', // Apply custom styles
    // });
  
    // toast.present();
  }
  
  
}
