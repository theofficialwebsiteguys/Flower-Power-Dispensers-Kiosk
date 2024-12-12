import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { Observable, of } from 'rxjs';

import { ProductsService } from '../products.service';

import { Product } from '../product/product.model';
import { ProductCategory } from '../product-category/product-category.model';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit {

  @Input() showSimilarItems: boolean = false;

  constructor(private productService: ProductsService) {}

  currentCategory: ProductCategory = 'PRE_ROLLS';
  products$: Observable<Product[]> = of([]);

  ngOnInit() {
    this.updateProducts();

    this.productService.currentCategory$.subscribe((category) => {
      this.currentCategory = category; 
      this.updateProducts();
    });

    this.productService.currentProductFilters$.subscribe(() => {
      this.updateProducts();
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['showSimilarItems']) {
      this.updateProducts();
    }
  }

  private updateProducts() {
    if (this.showSimilarItems) {
      this.products$ = this.productService.getSimilarItems();
    } else {
      this.products$ = this.productService.getFilteredProducts();
    }
  }
}
