import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {
  
  showMode: 'login' | 'register' | 'forgot-password' | 'reset-password' = 'login';


  constructor(private route: ActivatedRoute) {
    this.route.queryParams.subscribe(params => {
      const mode = params['mode'];
      const token = params['token']; // Check for the reset token
  
      if (token) {
        this.showMode = 'reset-password'; // Switch to reset-password mode
      } else if (mode === 'register' || mode === 'forgot-password') {
        this.showMode = mode;
      } else {
        this.showMode = 'login'; // Default to login if no valid mode
      }
    });
  }

  ngOnInit() {}

}
