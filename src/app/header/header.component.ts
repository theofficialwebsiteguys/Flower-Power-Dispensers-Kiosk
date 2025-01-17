import { Component } from '@angular/core';

import { AuthService } from '../auth.service';
import { SettingsService } from '../settings.service';
import { Router } from '@angular/router';
import { CartService } from '../cart.service';
import { AccessibilityService } from '../accessibility.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  isLoggedIn = false;
  darkModeEnabled = false;
  userPoints = 0;
  cartItemCount = 0;

  constructor(
    private authService: AuthService,
    private settingsService: SettingsService,
    private cartService: CartService,
    private router: Router,
    private accessibilityService: AccessibilityService
  ) {}

  ngOnInit() {
    this.authService.isLoggedIn().subscribe((status) => {
      this.isLoggedIn = status;
      if(this.isLoggedIn){
        this.authService.getUserInfo().subscribe((userInfo: any) => {
          if(userInfo){
            this.userPoints = userInfo.points;
            this.accessibilityService.announce(`You have ${this.userPoints} reward points.`, 'polite');
          }
        });
      } else {
        this.accessibilityService.announce('You are logged out.', 'polite');
      }
    });
    this.settingsService.isDarkModeEnabled$.subscribe((isDarkModeEnabled) => {
      this.darkModeEnabled = isDarkModeEnabled;
      const mode = this.darkModeEnabled ? 'Dark mode' : 'Light mode';
      this.accessibilityService.announce(`${mode} is enabled.`, 'polite');
    });

    this.cartService.cart$.subscribe((cartItems) => {
      const previousCount = this.cartItemCount;
      this.cartItemCount = cartItems.reduce((count, item) => count + item.quantity, 0);
      if (this.cartItemCount !== previousCount) {
        this.accessibilityService.announce(`You have ${this.cartItemCount} items in your cart.`, 'polite');
      }
    });
  }

  logout() {
    this.authService.logout();
    this.accessibilityService.announce('You have been logged out successfully.', 'polite');
  }

  goToCart() {
    this.router.navigateByUrl('/cart');
    this.accessibilityService.announce('Navigating to your shopping cart.', 'polite');
  }
}
