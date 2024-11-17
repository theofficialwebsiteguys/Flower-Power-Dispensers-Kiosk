import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
})
export class AccountComponent {
  user = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '000-000-0000'
  };

  settings = {
    notifications: true,
    darkMode: false,
    promotionalEmails: true
  };

  toggleSetting(setting: keyof typeof this.settings) {
    this.settings[setting] = !this.settings[setting];
  }

}
