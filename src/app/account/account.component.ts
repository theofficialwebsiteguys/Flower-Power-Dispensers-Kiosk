import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
})
export class AccountComponent {
  @Input() user: { name: string; email: string; phone: string; dob: string } = {
    name: '',
    email: '',
    phone: '',
    dob: '',
  };

  settings = {
    notifications: true,
    darkMode: false,
    promotionalEmails: true, // New setting added
  };

  toggleSetting(setting: keyof typeof this.settings) {
    this.settings[setting] = !this.settings[setting];
  }

}
