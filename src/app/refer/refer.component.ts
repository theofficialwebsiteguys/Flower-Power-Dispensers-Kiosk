import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-refer',
  templateUrl: './refer.component.html',
  styleUrls: ['./refer.component.scss'],
})
export class ReferComponent {
  referralEmail: string = '';
  referralCount: number = 0;
  maxReferrals: number = 3;
  message: string = '';

  sendReferral() {
    if (this.referralCount < this.maxReferrals && this.validateEmail(this.referralEmail)) {
      this.referralCount++;
      this.message = `Referral sent to ${this.referralEmail}. You've earned 100 points!`;
      this.referralEmail = ''; // Clear the input after sending
    } else if (this.referralCount >= this.maxReferrals) {
      this.message = 'You have reached the maximum number of referrals.';
    } else {
      this.message = 'Please enter a valid email address.';
    }
  }

  validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
}
