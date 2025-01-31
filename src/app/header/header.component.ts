import { Component } from '@angular/core';

import { AuthService } from '../auth.service';
import { SettingsService } from '../settings.service';
import { Router } from '@angular/router';
import { CartService } from '../cart.service';
import { AccessibilityService } from '../accessibility.service';
import { filter, of, switchMap, tap } from 'rxjs';

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
  showNotifications = false;
  unreadCount = 2; // Example unread count

  notifications: any[] = [];

  constructor(
    private authService: AuthService,
    private settingsService: SettingsService,
    private cartService: CartService,
    private router: Router,
    private accessibilityService: AccessibilityService
  ) {}

  ngOnInit() {
    this.authService.isLoggedIn().pipe(
      tap(status => {
        this.isLoggedIn = status;
        if (!this.isLoggedIn) {
          this.accessibilityService.announce('You are logged out.', 'polite');
        }
      }),
      filter(status => status), // Only proceed if the user is logged in
      switchMap(() => this.authService.getUserInfo()),
      tap((userInfo: any) => {
        if (userInfo) {
          this.userPoints = userInfo.points;
          this.accessibilityService.announce(`You have ${this.userPoints} reward points.`, 'polite');
        }
      }),
      switchMap(() => this.settingsService.getUserNotifications())
    ).subscribe(notifications => {
      this.notifications = notifications;
      this.unreadCount = notifications.filter((n: any) => n.status === 'unread').length;
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
  

// Mark all notifications as read
markAllNotificationsAsRead() {
  if (this.unreadCount > 0) {
    this.settingsService.markAllNotificationsAsRead(this.authService.getCurrentUser().id).subscribe(() => {
      this.notifications.forEach(n => (n.status = 'read'));
      this.unreadCount = 0;
    });
  }
}

  toggleNotifications() {
    this.showNotifications = true;
    this.markAllNotificationsAsRead();
  }
  
  closeNotifications() {
    this.showNotifications = false;
  }
  
  // Remove an individual notification
  clearNotification(notification: any) {
    const index = this.notifications.indexOf(notification);
    if (index > -1) {
      this.notifications.splice(index, 1);
      this.unreadCount--;
      this.settingsService.deleteNotification(notification.id).subscribe();
    }
  }

  // Clear all notifications
  clearAllNotifications() {
    this.settingsService.deleteAllNotifications(this.authService.getCurrentUser().id).subscribe(() => {
      this.notifications = [];
      this.unreadCount = 0;
    });
  }

  markAsRead(notification: any) {
    if (!notification.read) {
      notification.read = true;
      this.unreadCount--;
    }
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
