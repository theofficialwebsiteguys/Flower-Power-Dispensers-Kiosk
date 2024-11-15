import { Component, OnInit } from '@angular/core';

import { Product } from '../product/product.model';

import { ProductsService } from '../products.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  constructor(private productService: ProductsService) {}

  ngOnInit(): void {}
}
