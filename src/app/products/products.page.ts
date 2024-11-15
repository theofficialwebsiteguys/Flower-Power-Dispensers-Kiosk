import { Component, OnInit } from '@angular/core';

import { Product } from '../product/product.model';
import { ProductCategory } from '../product-category/product-category.model';

@Component({
  selector: 'app-products',
  templateUrl: './products.page.html',
  styleUrls: ['./products.page.scss'],
})
export class ProductsPage implements OnInit {
  constructor() {}

  products: Product[] = [];
  currentCategory: ProductCategory = 'FLOWER';

  ngOnInit() {
    // TODO replace with call to products service getter
    this.products = this.getProducts();
  }

  changeCategory(category: ProductCategory) {
    this.currentCategory = category;
  }

  getProducts(): Product[] {
    return [
      {
        category: 'FLOWER',
        title: 'Flower 1',
        brand: 'Brand 1',
        strainType: 'SATIVA',
        thc: '20.3',
        weight: '3.5',
        price: '40',
      },
      {
        category: 'FLOWER',
        title: 'Flower 2',
        brand: 'Brand 1',
        strainType: 'INDICA',
        thc: '22.1',
        weight: '3.5',
        price: '45',
      },
      {
        category: 'FLOWER',
        title: 'Flower 3',
        brand: 'Brand 2',
        strainType: 'HYBRID',
        thc: '18.7',
        weight: '3.5',
        price: '40',
      },
      {
        category: 'PRE-ROLL',
        title: 'Pre Roll 1',
        brand: 'Brand 1',
        strainType: 'HYBRID',
        thc: '25.4',
        weight: '1',
        price: '15',
      },
      {
        category: 'PRE-ROLL',
        title: 'Pre Roll 2',
        brand: 'Brand 2',
        strainType: 'SATIVA',
        thc: '19.6',
        weight: '1',
        price: '10',
      },
      {
        category: 'PRE-ROLL',
        title: 'Pre Roll 3',
        brand: 'Brand 2',
        strainType: 'SATIVA',
        thc: '20.3',
        weight: '2',
        price: '15',
      },
      {
        category: 'VAPORIZER',
        title: 'Vaporizer 1',
        brand: 'Brand 1',
        strainType: 'INDICA',
        thc: '22.1',
        weight: '0.5',
        price: '45',
      },
      {
        category: 'CONCENTRATE',
        title: 'Concentrate 1',
        brand: 'Brand 1',
        strainType: 'INDICA',
        thc: '88.7',
        weight: '1',
        price: '90',
      },
      {
        category: 'CONCENTRATE',
        title: 'Concentrate 2',
        brand: 'Brand 2',
        strainType: 'HYBRID',
        thc: '85.2',
        weight: '1',
        price: '85',
      },
    ];
  }
}
