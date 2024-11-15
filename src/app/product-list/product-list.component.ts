import { Component, Input, OnInit } from '@angular/core';

import { Product } from '../product/product.model';
import { ProductCategory } from '../product-category/product-category.model';
import {
  DEFAULT_FILTERS,
  Filters,
} from '../product-filters/product-filters.model';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit {
  constructor() {}

  @Input() products: Product[] = [];
  @Input() currentCategory: ProductCategory = 'FLOWER';

  filteredProducts: Product[] = this.products;

  ngOnInit() {
    this.onFilterUpdate(DEFAULT_FILTERS);
  }

  onFilterUpdate(filters: Filters) {
    // sort and filter filteredProducts
  }
}
