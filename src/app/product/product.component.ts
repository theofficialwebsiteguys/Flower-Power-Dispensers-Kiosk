import { Component, Input, OnInit } from '@angular/core';

import { ProductsService } from '../products.service';

import { Product } from './product.model';

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
    strainType: 'HYBRID',
    thc: '',
    weight: '',
    price: '',
    image: '',
  };

  ngOnInit() {}

  updateProductDisplay() {
    this.productService.updateCurrentProduct(this.product);
  }
}
