import { Component, OnInit } from '@angular/core';

import { ProductsService } from '../products.service';

import { ProductCategory } from '../product-category/product-category.model';
import { Product } from '../product/product.model';

@Component({
  selector: 'app-card-slider',
  templateUrl: './card-slider.component.html',
  styleUrls: ['./card-slider.component.scss'],
})
export class CardSliderComponent {
  categories: { title: string; category?: ProductCategory }[] = [
    {
      title: 'Concierge Picks',
      category: 'CONCIERGE',
    },
    {
      title: 'Specials',
      category: 'SPECIAL',
    },
    {
      title: 'Flower',
      category: 'FLOWER',
    },
    {
      title: 'Pre-Roll',
      category: 'PRE-ROLL',
    },
    {
      title: 'Edible',
      category: 'EDIBLE',
    },

    // Add more categories as needed
  ];

  products: Product[] = [];

  constructor(private productService: ProductsService) {}

  ngOnInit() {
    this.products = this.productService.getProductsList();
  }

  updateCategory(category?: ProductCategory) {
    if (!category) {
      return;
    }
    this.productService.updateCategory(category);
  }

  updateProductDisplay(product: Product) {
    // Navigate to the desired route, e.g., /product-details/:id
    this.productService.updateCurrentProduct(product);
  }
}
