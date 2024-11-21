import { Component, OnInit } from '@angular/core';

import { Product } from '../product/product.model';

import { ProductsService } from '../products.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  isLoggedIn: boolean = false;

  constructor(private productService: ProductsService, private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.isLoggedIn().subscribe((status) => {
      this.isLoggedIn = status;
    });
  }

}
