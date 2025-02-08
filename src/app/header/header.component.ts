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

  async ngOnInit() {
    this.authService.isLoggedIn().subscribe(async (status) => {
      this.isLoggedIn = status;
      if (!status) {
        this.accessibilityService.announce('You are logged out.', 'polite');
        return;
      }
  
      this.authService.getUserInfo().subscribe((userInfo: any) => {
        if (userInfo) {
          this.userPoints = userInfo.points;
          this.accessibilityService.announce(`You have ${this.userPoints} reward points.`, 'polite');
        }
      });
  
      // Updated getUserNotifications call using async/await
      try {
        const notifications = await this.settingsService.getUserNotifications();
        this.notifications = notifications;
        this.unreadCount = notifications.filter((n: any) => n.status === 'unread').length;
      } catch (error) {
        console.error('Error fetching notifications:', error);
      }
    });
  
    this.settingsService.isDarkModeEnabled$.subscribe((isDarkModeEnabled) => {
      this.darkModeEnabled = isDarkModeEnabled;
      this.accessibilityService.announce(`${isDarkModeEnabled ? 'Dark mode' : 'Light mode'} is enabled.`, 'polite');
    });
  
    this.cartService.cart$.subscribe((cartItems) => {
      const newCount = cartItems.reduce((count, item) => count + item.quantity, 0);
      if (this.cartItemCount !== newCount) {
        this.cartItemCount = newCount;
        this.accessibilityService.announce(`You have ${this.cartItemCount} items in your cart.`, 'polite');
      }
    });
  }

  // ngOnInit() {
  //   this.authService.isLoggedIn().subscribe(status => {
  //     this.isLoggedIn = status;
  //     if (!status) {
  //       this.accessibilityService.announce('You are logged out.', 'polite');
  //       return;
  //     }
  
  //     this.authService.getUserInfo().subscribe((userInfo: any) => {
  //       if (userInfo) {
  //         this.userPoints = userInfo.points;
  //         this.accessibilityService.announce(`You have ${this.userPoints} reward points.`, 'polite');
  //       }
  //     });
  
  //     this.settingsService.getUserNotifications().subscribe(notifications => {
  //       this.notifications = notifications;
  //       this.unreadCount = notifications.filter((n: any) => n.status === 'unread').length;
  //     });
  //   });
  
  //   this.settingsService.isDarkModeEnabled$.subscribe(isDarkModeEnabled => {
  //     this.darkModeEnabled = isDarkModeEnabled;
  //     this.accessibilityService.announce(`${isDarkModeEnabled ? 'Dark mode' : 'Light mode'} is enabled.`, 'polite');
  //   });
  
  //   this.cartService.cart$.subscribe(cartItems => {
  //     const newCount = cartItems.reduce((count, item) => count + item.quantity, 0);
  //     if (this.cartItemCount !== newCount) {
  //       this.cartItemCount = newCount;
  //       this.accessibilityService.announce(`You have ${this.cartItemCount} items in your cart.`, 'polite');
  //     }
  //   });
  // }
  
  
  async markAllNotificationsAsRead() {
    if (this.unreadCount > 0) {
      try {
        await this.settingsService.markAllNotificationsAsRead(this.authService.getCurrentUser().id);
        
        // Update local notification statuses
        this.notifications.forEach(n => (n.status = 'read'));
        this.unreadCount = 0;
      } catch (error) {
        console.error('Error marking all notifications as read:', error);
      }
    }
  }

// // Mark all notifications as read
// markAllNotificationsAsRead() {
//   if (this.unreadCount > 0) {
//     this.settingsService.markAllNotificationsAsRead(this.authService.getCurrentUser().id).subscribe(() => {
//       this.notifications.forEach(n => (n.status = 'read'));
//       this.unreadCount = 0;
//     });
//   }
// }

  toggleNotifications() {
    this.showNotifications = true;
    this.markAllNotificationsAsRead();
  }
  
  closeNotifications() {
    this.showNotifications = false;
  }
  
  // // Remove an individual notification
  // clearNotification(notification: any) {
  //   const index = this.notifications.indexOf(notification);
  //   if (index > -1) {
  //     this.notifications.splice(index, 1);
  //     this.unreadCount--;
  //     this.settingsService.deleteNotification(notification.id).subscribe();
  //   }
  // }

  async clearNotification(notification: any) {
    const index = this.notifications.indexOf(notification);
    if (index > -1) {
      this.notifications.splice(index, 1);
      this.unreadCount--;
  
      try {
        await this.settingsService.deleteNotification(notification.id);
      } catch (error) {
        console.error('Error deleting notification:', error);
      }
    }
  }

  // // Clear all notifications
  // clearAllNotifications() {
  //   this.settingsService.deleteAllNotifications(this.authService.getCurrentUser().id).subscribe(() => {
  //     this.notifications = [];
  //     this.unreadCount = 0;
  //   });
  // }

    // Clear all notifications
    async clearAllNotifications() {
      try {
        await this.settingsService.deleteAllNotifications(this.authService.getCurrentUser().id);
        this.notifications = [];
        this.unreadCount = 0;
      } catch (error) {
        console.error('Error deleting all notifications:', error);
      }
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
