import { Component, OnInit } from '@angular/core';
import { Product } from '../product/product.model';
import { ProductsService } from '../products.service';

@Component({
  selector: 'app-product-display',
  templateUrl: './product-display.page.html',
  styleUrls: ['./product-display.page.scss'],
})
export class ProductDisplayPage implements OnInit {

  similarProducts: Array<Product> = []

  constructor(private productService: ProductsService) { }

  ngOnInit() {
    this.similarProducts = this.productService.getSimilarProducts()
  }

}
