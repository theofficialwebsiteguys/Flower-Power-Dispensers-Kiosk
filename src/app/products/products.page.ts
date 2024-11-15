import { Component, OnInit } from '@angular/core';

import { Product } from '../product/product.model';
import { ProductCategory } from '../product-category/product-category.model';
import { ProductsService } from '../products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.page.html',
  styleUrls: ['./products.page.scss'],
})
export class ProductsPage implements OnInit {
  constructor(private productService: ProductsService) {}

  currentCategory: ProductCategory = 'FLOWER';
  products: Product[] = [];

  ngOnInit() {
    // TODO replace with call to products service getter
    this.productService.currentCategory$.subscribe((category) => {
      this.currentCategory = category; // Automatically updates whenever the category changes in the service
      this.products = this.productService.getProductsList();
    });
  }
}
