import { Component, Input, OnInit } from '@angular/core';

import { Product } from './product.model';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {
  constructor() {}

  @Input() product: Product = {
    category: '',
    title: '',
    brand: '',
    strainType: '',
    thc: '',
    weight: '',
    price: '',
    image: ''
  };

  ngOnInit() {}
}
