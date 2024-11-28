import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

import { ProductsService } from '../products.service';

import { Product } from '../product/product.model';

@Component({
  selector: 'app-single-product',
  templateUrl: './single-product.component.html',
  styleUrls: ['./single-product.component.scss'],
})
export class SingleProductComponent implements OnInit {
  currentProduct: Product = {
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

  showFullDescription = false;

  constructor(
    private productService: ProductsService,
    private location: Location,
    private router: Router
  ) {}

  ngOnInit() {
    this.productService.currentProduct$.subscribe((product) => {
      if (product) this.currentProduct = product;
      else this.router.navigateByUrl('/home');
    });
  }

  toggleDescription() {
    this.showFullDescription = !this.showFullDescription;
  }

  getDescription(): string {
    if (!this.currentProduct.desc) {
      return '';
    }
    return this.showFullDescription || this.currentProduct.desc.length <= 75
      ? this.currentProduct.desc
      : this.currentProduct.desc.substring(0, 75) + '...';
  }

  goBack() {
    this.location.back();
  }
}
