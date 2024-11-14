import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { ProductCategory } from './product-category.model';
import { ProductsService } from '../products.service';

@Component({
  selector: 'app-product-category',
  templateUrl: './product-category.component.html',
  styleUrls: ['./product-category.component.scss'],
})
export class ProductCategoryComponent implements OnInit {
  constructor(private productService: ProductsService) {}

  @Input() category: ProductCategory = 'FLOWER';

  ngOnInit() {}

  handleCategorySelect(category: ProductCategory) {
    this.productService.updateCategory(category);
  }
}
