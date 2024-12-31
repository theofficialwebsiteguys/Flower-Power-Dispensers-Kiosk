import { trigger, transition, style, animate, state } from '@angular/animations';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-splash-screen',
  templateUrl: './splash-screen.component.html',
  styleUrls: ['./splash-screen.component.scss'],
  animations: [
    trigger('logoAnimation', [
      state('initial', style({ transform: 'translateY(-100%)', opacity: 0 })),
      state('final', style({ transform: 'translateY(0)', opacity: 1 })),
      transition('initial => final', [animate('0.6s ease-out')]),
    ]),
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('0.5s ease-in', style({ opacity: 1 })),
      ]),
    ]),
    trigger('fadeOut', [
      transition(':leave', [
        style({ transform: 'scale(1)', opacity: 1 }),
        animate('0.5s ease-in', style({ transform: 'scale(0.8)', opacity: 0 })),
      ]),
    ]),
  ],
})
export class SplashScreenComponent implements OnInit {
  @Output() closeSplash = new EventEmitter<void>();
  logoState = 'initial';
  showAgeVerification = false;
  splashVisibility = 'visible';
  logoSrc = 'assets/logo.png';

  ngOnInit() {
    const isDarkMode = document.body.classList.contains('dark-mode');
    this.logoSrc = isDarkMode ? 'assets/logo-dark-mode.png' : 'assets/logo.png';

    // Animate the logo first
    setTimeout(() => {
      this.logoState = 'final';
    }, 200);

    // Delay age verification appearance until logo animation completes
    setTimeout(() => {
      this.showAgeVerification = true;
    }, 1000);
  }

  onYesClick() {
    this.splashVisibility = 'hidden';
    this.showAgeVerification = false;
    setTimeout(() => {
      this.closeSplash.emit();
    }, 100);
  }

  onNoClick() {
    alert('Sorry, you must be over 21 to enter.');
  }
}
