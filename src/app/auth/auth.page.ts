import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage {
  
  showMode: 'login' | 'register' | 'forgot-password' | 'reset-password' = 'login';

  resetToken: string = ''

  constructor(private readonly route: ActivatedRoute) {
    this.route.queryParams.subscribe(({mode, token}) => {
      this.showMode = mode;
      if(token){
        this.resetToken=token;
      }
    });
  }

}
