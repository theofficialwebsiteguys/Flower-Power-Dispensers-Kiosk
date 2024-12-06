import { trigger, transition, style, animate } from '@angular/animations';
import { Component } from '@angular/core';

import { ProductsService } from './products.service';
import { AuthService } from './auth.service';
import { SettingsService } from './settings.service';
import { FcmService } from './fcm.service';

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
  showSplashScreen: boolean = true;

  constructor(
    private productService: ProductsService,
    private authService: AuthService,
    private settingsService: SettingsService,
    private fcmService: FcmService
  ) { }

  ngOnInit() {
    this.productService.fetchProducts();
    this.authService.validateSession();
    this.settingsService.updateTheme();
    //this.fcmService.initPushNotifications('test@gmail.com')
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
