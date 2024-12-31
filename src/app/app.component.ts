import {
  trigger,
  transition,
  style,
  animate,
  group,
  query,
} from '@angular/animations';
import { Component } from '@angular/core';
import { App } from '@capacitor/app';

import { ProductsService } from './products.service';
import { AuthService } from './auth.service';
import { SettingsService } from './settings.service';
import { FcmService } from './fcm.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('0.5s ease-in', style({ opacity: 1 })),
      ]),
    ]),
    trigger('fadeOut', [
      transition(':leave', [
        style({ opacity: 1 }),
        animate('0.5s ease-out', style({ opacity: 0 })),
      ]),
    ]),
  ],
})
export class AppComponent {
  showSplashScreen: boolean = true;

  isLoggedIn: boolean = false;

  constructor(
    private productService: ProductsService,
    private authService: AuthService,
    private settingsService: SettingsService,
    private fcmService: FcmService,
    private router: Router
  ) {
    // Listen for app URL open events
    App.addListener('appUrlOpen', (data: any) => {
      console.log('App opened with URL:', JSON.stringify(data));

      // Parse the path and query params
      const url = new URL(data.url);
      const mode = url.searchParams.get('mode');
      const token = url.searchParams.get('token');

      // Navigate to the appropriate route in the app
      if (mode === 'reset-password' && token) {
        this.router.navigate(['/auth'], {
          queryParams: { mode, token },
        });
      }
    });
  }

  ngOnInit() {
    this.productService.fetchProducts();
    this.authService.validateSession();
    this.settingsService.updateTheme();
    this.authService.isLoggedIn().subscribe((status) => {
      this.isLoggedIn = status;
      if (this.isLoggedIn) this.onCloseSplash();
    });
  }

  onCloseSplash() {
    // Set a slight delay to allow fade-out animation
    setTimeout(() => {
      this.showSplashScreen = false;
    }, 100); // Matches the animation duration
    console.log(
      'Splash screen closed, showSplashScreen:',
      this.showSplashScreen
    );
  }
}
