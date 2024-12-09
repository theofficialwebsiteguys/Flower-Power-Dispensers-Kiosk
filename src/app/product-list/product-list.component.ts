import { Component, Input, OnInit } from '@angular/core';
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
    this.productService.currentCategory$.subscribe((category) => {
      this.currentCategory = category; // Automatically updates whenever the category changes in the service
      if(this.showSimilarItems){
        this.products$ = this.productService.getSimilarItems();
      }else{
        this.products$ = this.productService.getFilteredProducts();
      }
    });

    this.productService.currentProductFilters$.subscribe(() => {
      this.products$ = this.productService.getFilteredProducts();
    });

  }
}
