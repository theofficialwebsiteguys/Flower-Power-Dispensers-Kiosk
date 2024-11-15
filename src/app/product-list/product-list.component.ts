import { Component, Input, OnInit } from '@angular/core';

import { Product } from '../product/product.model';
import { ProductCategory } from '../product-category/product-category.model';
import {
  DEFAULT_FILTERS,
  Filters,
} from '../product-filters/product-filters.model';

import { ProductsService } from '../products.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit {
  constructor(private productService: ProductsService) {}

  @Input() products: Product[] = [];

  currentCategory: ProductCategory = 'FLOWER';
  filteredProducts: Product[] = this.products;

  ngOnInit() {
    this.productService.currentCategory$.subscribe((category) => {
      this.currentCategory = category; // Automatically updates whenever the category changes in the service
    });
    this.onFilterUpdate(DEFAULT_FILTERS);
  }

  onFilterUpdate(filters: Filters) {
    // sort and filter filteredProducts
  }
}
