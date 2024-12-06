import { Component } from '@angular/core';

import { AuthService } from '../auth.service';
import { SettingsService } from '../settings.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  isLoggedIn = false;
  darkModeEnabled = false;
  userPoints = 120;

  constructor(
    private authService: AuthService,
    private settingsService: SettingsService,
    private router: Router
  ) {}

  ngOnInit() {
    // Subscribe to the authentication status
    this.authService.isLoggedIn().subscribe((status) => {
      this.isLoggedIn = status;
    });
    this.settingsService.isDarkModeEnabled$.subscribe((isDarkModeEnabled) => {
      this.darkModeEnabled = isDarkModeEnabled;
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
