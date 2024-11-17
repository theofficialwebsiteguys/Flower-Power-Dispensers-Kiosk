import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {
  
  showMode: 'login' | 'register' | 'forgot-password' = 'login'; // Default to login mode

  constructor(private route: ActivatedRoute) {
    this.route.queryParams.subscribe(params => {
      const mode = params['mode'];
      if (mode === 'register' || mode === 'forgot-password') {
        this.showMode = mode;
      } else {
        this.showMode = 'login'; // Default to login if mode is invalid
      }
    });
  }

  ngOnInit() {}

}
