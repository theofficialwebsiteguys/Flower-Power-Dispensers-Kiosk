import { Component, Output, OnInit, EventEmitter } from '@angular/core';

import { ProductCategory } from '../product-category/product-category.model';

@Component({
  selector: 'app-product-categories',
  templateUrl: './product-categories.component.html',
  styleUrls: ['./product-categories.component.scss'],
})
export class ProductCategoriesComponent implements OnInit {
  constructor() {}

  @Output() selectCategory = new EventEmitter<ProductCategory>();

  categories: ProductCategory[] = [];

  ngOnInit() {
    // TODO replace with call to product categories service getter
    this.categories = this.getCategories();
  }

  handleCategorySelect(category: ProductCategory) {
    this.selectCategory.emit(category);
  }

  getCategories(): ProductCategory[] {
    return [
      'FLOWER',
      'PRE-ROLL',
      'CONCENTRATE',
      'VAPORIZER',
      'TOPICAL',
      'TINCTURE',
      'EDIBLE',
    ];
  }
}
