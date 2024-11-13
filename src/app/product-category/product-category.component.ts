import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { ProductCategory } from './product-category.model';

@Component({
  selector: 'app-product-category',
  templateUrl: './product-category.component.html',
  styleUrls: ['./product-category.component.scss'],
})
export class ProductCategoryComponent implements OnInit {
  constructor() {}

  @Input() category: ProductCategory = 'FLOWER';

  @Output() selectCategory = new EventEmitter<ProductCategory>();

  ngOnInit() {}

  handleCategorySelect(category: ProductCategory) {
    this.selectCategory.emit(category);
  }
}
