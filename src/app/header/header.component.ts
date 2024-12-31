import { Component } from '@angular/core';

import { AuthService } from '../auth.service';
import { SettingsService } from '../settings.service';
import { Router } from '@angular/router';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  isLoggedIn = false;
  darkModeEnabled = false;
  userPoints = 0;
  cartItemCount = 0; // Initialize cart item count

  constructor(
    private authService: AuthService,
    private settingsService: SettingsService,
    private cartService: CartService,
    private router: Router
  ) {}

  ngOnInit() {
    // Subscribe to the authentication status
    this.authService.isLoggedIn().subscribe((status) => {
      this.isLoggedIn = status;
      if(this.isLoggedIn){
        this.authService.getUserInfo().subscribe((userInfo: any) => {
          if(userInfo)
            this.userPoints = userInfo.points;
        });
      }
    });
    this.settingsService.isDarkModeEnabled$.subscribe((isDarkModeEnabled) => {
      this.darkModeEnabled = isDarkModeEnabled;
    });

    this.cartService.cart$.subscribe((cartItems) => {
      this.cartItemCount = cartItems.reduce((count, item) => count + item.quantity, 0);
    });
    // this.darkModeEnabled = this.settingsService.getDarkModeEnabled();
  }

  // Call the AuthService's logout function
  logout() {
    this.authService.logout();
  }

  goToCart() {
    // Replace with your navigation logic
    this.router.navigateByUrl('/cart');
  }
}
