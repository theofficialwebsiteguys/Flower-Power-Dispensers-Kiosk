import { Component, Input, OnInit } from '@angular/core';

import { Product } from '../product/product.model';
import { ProductCategory } from '../product-category/product-category.model';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit {
  constructor() {}

  @Input() products: Array<Product> = [];
  @Input() currentCategory: ProductCategory = 'FLOWER';

  ngOnInit() {}
}
