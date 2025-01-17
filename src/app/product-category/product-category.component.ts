import { Component, Input, OnInit } from '@angular/core';

import { ProductsService } from '../products.service';

import { CategoryWithImage, ProductCategory } from './product-category.model';
import { AccessibilityService } from '../accessibility.service';

@Component({
  selector: 'app-product-category',
  templateUrl: './product-category.component.html',
  styleUrls: ['./product-category.component.scss'],
})
export class ProductCategoryComponent implements OnInit {
  constructor(private productService: ProductsService, private accessibilityService: AccessibilityService) {}

  @Input() category: CategoryWithImage = {category: 'FLOWER', imageUrl: ''};

  ngOnInit() {}

  handleCategorySelect(category: ProductCategory) {
    this.productService.updateCategory(category);
    this.accessibilityService.announce(`${category} category selected.`, 'polite');
  }
}
