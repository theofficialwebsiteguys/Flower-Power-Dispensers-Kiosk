import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AccessibilityService } from '../accessibility.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage {
  
  showMode: 'login' | 'register' | 'forgot-password' | 'reset-password' = 'login';

  resetToken: string = ''

  constructor(private readonly route: ActivatedRoute, private accessibilityService: AccessibilityService) {
    this.route.queryParams.subscribe(({mode, token}) => {
      this.showMode = mode;
      this.accessibilityService.announce(`${this.getModeLabel(mode)} loaded`, 'polite');
      if(token){
        this.resetToken=token;
      }
    });
  }

  private getModeLabel(mode: string): string {
    switch (mode) {
      case 'login': return 'Login form';
      case 'register': return 'Registration form';
      case 'forgot-password': return 'Forgot password form';
      case 'reset-password': return 'Reset password form';
      default: return 'Authentication form';
    }
  }

}
