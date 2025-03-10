import {
  trigger,
  transition,
  style,
  animate,
  group,
  query,
} from '@angular/animations';
import { Component, HostListener } from '@angular/core';
import { App } from '@capacitor/app';

import { ProductsService } from './products.service';
import { AuthService } from './auth.service';
import { SettingsService } from './settings.service';
import { FcmService } from './fcm.service';
import { Router } from '@angular/router';
import { GeolocationService } from './geolocation.service';
import { AlertController, ModalController } from '@ionic/angular';
import { RestrictedComponent } from './restricted/restricted.component';

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

  private inactivityTimer: any;
  private confirmTimer: any;
  private inactivityLimit = 5 * 60 * 1000; // 5 minutes
  private confirmLimit = 60 * 1000; // 30 seconds to respond

  constructor(
    private productService: ProductsService,
    private authService: AuthService,
    private settingsService: SettingsService,
    private fcmService: FcmService,
    private router: Router,
    private geoLocationService: GeolocationService,
    private modalController: ModalController,
    private alertController: AlertController
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
    //this.checkGeoLocation();
    this.initializeApp();
  }
  
  initializeApp() {
    // setTimeout(() => this.startInactivityTimer(), 100);
    //this.authService.validateSession();
    this.settingsService.updateTheme();
  
    // Only check login after products are fetched
    this.authService.isLoggedIn().subscribe((status) => {
      this.isLoggedIn = status;
      // if (this.isLoggedIn) this.onCloseSplash();
    });
            
    this.productService.fetchProducts().subscribe({
      next: () => {
        console.log("Products fetched successfully.");
  

      },
      error: (error) => {
        console.error("Error fetching products:", error);
      }
    });
  }

  private startInactivityTimer() {
    clearTimeout(this.inactivityTimer);
    this.inactivityTimer = setTimeout(() => this.promptUserActivity(), this.inactivityLimit);
  }

    /** Reset Inactivity Timer on User Activity */
    @HostListener('document:mousemove')
    @HostListener('document:keypress')
    @HostListener('document:touchstart')
    resetInactivityTimer() {
      if (!this.showSplashScreen) {
        clearTimeout(this.inactivityTimer);
        this.startInactivityTimer();
      }
    }
  
    private async promptUserActivity() {
      let timeLeft = this.confirmLimit / 1000; // Convert milliseconds to seconds
    
      const alert = await this.alertController.create({
        header: `Are you still there? ${timeLeft}`,
        message: 'Tap "Still here" to continue shopping',
        buttons: [
          {
            text: 'Still here',
            handler: () => {
              clearTimeout(this.confirmTimer); // Stop auto-reload
              clearInterval(countdownInterval); // Stop countdown updates
              this.resetInactivityTimer(); // Restart the inactivity timer
            },
          },
        ],
        backdropDismiss: false, // Prevent dismissing by clicking outside
      });
    
      await alert.present();
    
      // Update countdown every second
      const countdownInterval = setInterval(async () => {
        timeLeft -= 1;
        if (timeLeft <= 0) {
          clearInterval(countdownInterval); // Stop the countdown
        } else {
          alert.header = `Are you still there? ${timeLeft}`,
          await alert.header; // Force update the UI
        }
      }, 1000);
    
      // If user doesn't respond within confirmLimit, reload
      this.confirmTimer = setTimeout(() => {
        clearInterval(countdownInterval); // Stop the countdown before reload
        alert.dismiss();
        window.location.reload();
      }, this.confirmLimit);
    }
    

  onCloseSplash() {
    setTimeout(() => {
      this.showSplashScreen = false;
      this.startInactivityTimer();
  
      // Move focus to the main content area
      setTimeout(() => {
        const mainContent = document.getElementById('main-content');
        if (mainContent) {
          mainContent.setAttribute('tabindex', '-1'); // Make it focusable
          mainContent.focus(); // Move focus
        }
      }, 0); // Allow time for DOM update
  
    }, 100); // Matches the fade-out animation duration
  
    console.log('Splash screen closed, showSplashScreen:', this.showSplashScreen);
  }
  async checkGeoLocation() {
    try {
      const isInNY = await this.geoLocationService.isUserInNewYork();
  
      if (!isInNY) {
        this.showRestrictedAccessModal(); // Show the modal if the user is outside NY
      } else {
        this.initializeApp(); // Proceed with app initialization if in NY
      }
    } catch (error) {
      console.error('Error during geo-check:', error);
      this.showRestrictedAccessModal(); // Show modal in case of errors
    }
  }
  
  async showRestrictedAccessModal() {
    const modal = await this.modalController.create({
      component: RestrictedComponent,
      backdropDismiss: false, // Prevent the modal from being dismissed
      cssClass: 'restricted-modal',
    });

    await modal.present();
  }
}
