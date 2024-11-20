import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { User } from './user.model';


@Component({
  selector: 'app-rewards',
  templateUrl: './rewards.page.html',
  styleUrls: ['./rewards.page.scss'],
})
export class RewardsPage implements OnInit {

  user: any;

  isLoggedIn: boolean = false;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.isLoggedIn().subscribe((status) => {
      this.isLoggedIn = status;
      // this.user = this.authService.getUserInfo();
      this.authService.getUserInfo().subscribe((userInfo: any) => {
        this.user = userInfo;
      });
    });
  }

}
