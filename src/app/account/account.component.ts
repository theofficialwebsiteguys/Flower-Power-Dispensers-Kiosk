import { Component, Input, OnInit } from '@angular/core';

import { AuthService } from '../auth.service';
import { SettingsService } from '../settings.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
})
export class AccountComponent implements OnInit {
  @Input() user: any;
  allowNotifications: boolean = false;
  darkModeEnabled: boolean = false;

  userInfo: any[] = [];
  settings: any[] = [];
  isLoggedIn: boolean = false;

  constructor(
    private readonly authService: AuthService,
    private readonly settingsService: SettingsService
  ) {}

  ngOnInit(): void {
    if (this.user) {
      this.populateUserInfo(this.user);
      this.darkModeEnabled = this.settingsService.getDarkModeEnabled();
      this.setupSettings();
    }
  }

  private populateUserInfo(user: any) {
    this.userInfo = [
      {
        icon: 'person-outline',
        label: 'Name',
        value: `${user.fname} ${user.lname}`,
      },
      { icon: 'mail-outline', label: 'Email', value: user.email },
      { icon: 'call-outline', label: 'Phone', value: user.phone },
    ];
  }

  private setupSettings() {
    this.settings = [
      {
        id: 'notifications',
        label: 'Notifications',
        value: this.allowNotifications,
        action: (value: boolean) => this.onToggleNotifications(value),
      },
      {
        id: 'darkMode',
        label: 'Dark Mode',
        value: this.darkModeEnabled,
        action: (value: boolean) => this.onToggleDarkMode(value),
      },
    ];
  }

  onToggleNotifications(value: boolean): void {
    this.authService.toggleUserNotifications(this.user.id).subscribe({
      next: () => {
        console.log('Notification setting updated successfully');
        this.allowNotifications = value;
      },
      error: (err) => {
        console.error('Failed to update notification setting:', err);
      },
    });
  }

  onToggleDarkMode(value: boolean): void {
    this.darkModeEnabled = value;
    this.settingsService.setDarkModeEnabled(this.darkModeEnabled);
  }

  logout() {
    this.authService.logout();
  }
}
