import { Component, OnInit } from '@angular/core';
import { Product } from '../product/product.model';
import { ProductsService } from '../products.service';
import { ProductCategory } from '../product-category/product-category.model';

@Component({
  selector: 'app-redeem-products',
  templateUrl: './redeem-products.component.html',
  styleUrls: ['./redeem-products.component.scss'],
})
export class RedeemProductsComponent  implements OnInit {
  products: any[] = [];

  constructor() {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.products = [
      { id: 1, name: 'Product 1', imageUrl: 'assets/default.jpg', points: 100 },
      { id: 2, name: 'Product 2', imageUrl: 'assets/default.jpg', points: 200 },
      { id: 3, name: 'Product 3', imageUrl: 'assets/default.jpg', points: 150 },
      { id: 4, name: 'Product 4', imageUrl: 'assets/default.jpg', points: 250 },
      { id: 5, name: 'Product 5', imageUrl: 'assets/default.jpg', points: 300 },
    ];
  }
}
