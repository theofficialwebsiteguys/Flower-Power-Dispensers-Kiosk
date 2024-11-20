import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
})
export class AccountComponent {
  @Input() user: any;

  settings = {
    notifications: true,
    darkMode: false,
    promotionalEmails: true, // New setting added
  };

  toggleSetting(setting: keyof typeof this.settings) {
    this.settings[setting] = !this.settings[setting];
  }

}
