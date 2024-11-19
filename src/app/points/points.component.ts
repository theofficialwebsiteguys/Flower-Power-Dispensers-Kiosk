import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-points',
  templateUrl: './points.component.html',
  styleUrls: ['./points.component.scss'],
})
export class PointsComponent {

  @Input() points: number = 1200;
  maxPoints: number = 6000;
  isExclusiveMember: boolean = false; // Membership status
  
  progressPercentage: number = (this.points / this.maxPoints) * 100;

  earningInstructions: string = `
    Earn points by making purchases, referring friends, and participating in promotions.
    Every dollar spent earns you 10 points.
  `;

  redeemInstructions: string = `
    Redeem points for discounts on purchases. Every 100 points equals $1 off.
    Redeem easily at checkout or save up for bigger rewards!
  `;
}
