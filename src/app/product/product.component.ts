import { Component, Input, OnInit } from '@angular/core';

import { Product } from './product.model';
import { ProductsService } from '../products.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {
  constructor(private productService: ProductsService) {}

  @Input() product: Product = {
    category: '',
    title: '',
    brand: '',
    desc: '',
    strainType: '',
    thc: '',
    weight: '',
    price: '',
    image: ''
  };

  ngOnInit() {}

  updateProductDisplay() {
    // Navigate to the desired route, e.g., /product-details/:id
    this.productService.updateCurrentProduct(this.product);
  }
}
