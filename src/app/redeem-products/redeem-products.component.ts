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
      { id: 1, name: 'Product 1', imageUrl: 'https://imgix.dispenseapp.com/df759ba5e7360809_1724612408903-245009616-orange_creamsicle.avif', points: 1000 },
      { id: 2, name: 'Product 2', imageUrl: 'https://imgix.dispenseapp.com/df759ba5e7360809_1732922045183-645771785-HashGummies-SourApple.jpg', points: 2000 },
      { id: 3, name: 'Product 3', imageUrl: 'https://imgix.dispenseapp.com/df759ba5e7360809_1725628464350-225001509-6821731c-d6da-453e-9b88-c3e0b6afc780.jpg', points: 1500 },
      { id: 4, name: 'Product 4', imageUrl: 'https://imgix.dispenseapp.com/df759ba5e7360809_1726773591021-587295912-9fc21064f0864f18b179619e79f1e11f.png', points: 2500 },
      { id: 5, name: 'Product 5', imageUrl: 'https://imgix.dispenseapp.com/df759ba5e7360809_1726705081935-530739911-pura.png', points: 3000 },
    ];
  }
}
