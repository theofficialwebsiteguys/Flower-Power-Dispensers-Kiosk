import { Component, Output, OnInit, EventEmitter } from '@angular/core';

import { ProductCategory } from '../product-category/product-category.model';
import { ProductsService } from '../products.service';

@Component({
  selector: 'app-product-categories',
  templateUrl: './product-categories.component.html',
  styleUrls: ['./product-categories.component.scss'],
})
export class ProductCategoriesComponent implements OnInit {
  constructor(private productService: ProductsService) {}

  categories: ProductCategory[] = [];

  ngOnInit() {
    this.categories = this.productService.getCategories();
  }
}
