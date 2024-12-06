import { Component, OnInit } from '@angular/core';

import { ProductsService } from '../products.service';

import { CategoryWithImage } from '../product-category/product-category.model';

@Component({
  selector: 'app-product-categories',
  templateUrl: './product-categories.component.html',
  styleUrls: ['./product-categories.component.scss'],
})
export class ProductCategoriesComponent implements OnInit {
  constructor(private productService: ProductsService) {}

  categories: CategoryWithImage[] = [];

  ngOnInit() {
    this.categories = this.productService.getCategories();
  }
}
