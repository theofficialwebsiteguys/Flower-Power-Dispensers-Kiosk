import { trigger, transition, style, animate } from '@angular/animations';
import { Component } from '@angular/core';

import { ProductsService } from './products.service';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('0.2s ease-in', style({ opacity: 1 })),
      ]),
    ]),
  ],
})
export class AppComponent {
  showSplashScreen = true;

  constructor(private productService: ProductsService, private authService: AuthService) {}

  ngOnInit() {
    this.productService.fetchProducts();
    this.authService.validateSession();

  }

  onCloseSplash() {
    // Delay hiding the splash screen to allow the fade-out animation to complete
    this.showSplashScreen = false;
    console.log(
      'Splash screen closed, showSplashScreen:',
      this.showSplashScreen
    );
  }
}
