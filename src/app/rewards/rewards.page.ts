import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../auth.service';
import { IonContent } from '@ionic/angular';

@Component({
  selector: 'app-rewards',
  templateUrl: './rewards.page.html',
  styleUrls: ['./rewards.page.scss'],
})
export class RewardsPage implements OnInit {
  @ViewChild(IonContent, { static: false }) content!: IonContent;

  user: any;

  isLoggedIn: boolean = false;

  isAdmin: boolean = false;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.isLoggedIn().subscribe((status) => {
      this.isLoggedIn = status;
      this.authService.getUserInfo().subscribe((userInfo: any) => {
        this.user = userInfo;
        if(this.user.role === 'admin'){
          this.isAdmin = true;
        }
      });
    });
  }

  ionViewDidEnter(): void {
    this.scrollToTop(); // Scroll to top when the page is fully loaded
  }

  scrollToTop() {
    if (this.content) {
      this.content.scrollToTop(300); // Smooth scrolling with animation
    } else {
      console.warn('IonContent is not available.');
    }
  }

}
