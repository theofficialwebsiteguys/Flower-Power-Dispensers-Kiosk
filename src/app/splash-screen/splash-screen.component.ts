import { trigger, transition, style, animate, state } from '@angular/animations';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-splash-screen',
  templateUrl: './splash-screen.component.html',
  styleUrls: ['./splash-screen.component.scss'],
  animations: [
    trigger('logoAnimation', [
      state('initial', style({ transform: 'translateY(-100%)' })),
      state('final', style({ transform: 'translateY(-40%)' })),
      transition('initial => final', [
        animate('0.4s ease-out')
      ])
    ]),
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('0.5s ease-in', style({ opacity: 1 }))
      ])
    ]),
    trigger('fadeOut', [
      state('visible', style({ opacity: 1 })),
      state('hidden', style({ opacity: 0 })),
      transition('visible => hidden', [
        animate('0.5s ease-out')
      ])
    ])
  ]
})
export class SplashScreenComponent implements OnInit {
  @Output() closeSplash = new EventEmitter<void>();
  logoState = 'initial';
  showAgeVerification = false;
  splashVisibility = 'visible';


  ngOnInit() {
    console.log("Initializing SplashScreenComponent");

    // Trigger the logo animation
    setTimeout(() => {
      this.logoState = 'final';
      console.log("Logo animation complete, logoState:", this.logoState);
    }, 100);

    // Show the age verification text and buttons after the logo lands
    setTimeout(() => {
      this.showAgeVerification = true;
      console.log("Age verification set to visible:", this.showAgeVerification);
    }, 500);
  }

  onYesClick() {
    this.splashVisibility = 'hidden';
    setTimeout(() => {
      this.closeSplash.emit();
    }, 500);
  }

  onNoClick() {
    alert("Sorry, you must be over 21 to enter.");
  }
}
