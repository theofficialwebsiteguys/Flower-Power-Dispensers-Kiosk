import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
})
export class AccountComponent {
  @Input() user: any;

  allowNotifications: boolean = false; // Tracks the current notification setting
  userId: string = ''; // Store the current user's ID

  settings = {
    notifications: true,
    darkMode: false,
  };

  constructor(private authService: AuthService){
  }

  ngOnInit(): void {
    // Retrieve the user and their notification settings on component load
    const user = this.authService.getCurrentUser();

    if (user) {
      this.userId = user.id;
      this.allowNotifications = user.allow_notifications; // Set toggle state based on user data
    } else {
      // Handle cases where the user is not logged in
      this.authService.validateSession();
      this.authService.getUserInfo().subscribe((userInfo: any) => {
        if (userInfo) {
          this.userId = userInfo.id;
          this.allowNotifications = userInfo.allow_notifications;
        }
      });
    }
  }

  onToggleNotifications(event: any): void {
    const newValue = event.detail.checked; // Get the new value of the toggle
    this.allowNotifications = newValue;

    // Call the service to toggle notifications
    this.authService
      .toggleUserNotifications(this.userId)
      .subscribe({
        next: () => {
          console.log('Notification setting updated successfully');
        },
        error: (err) => {
          console.error('Failed to update notification setting:', err);
          // Revert the toggle if there was an error
          this.allowNotifications = !newValue;
        },
      });
  }

  onToggleDarkMode(event: any){

  }

}
