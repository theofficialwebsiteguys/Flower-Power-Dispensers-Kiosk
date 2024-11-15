import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-points',
  templateUrl: './points.component.html',
  styleUrls: ['./points.component.scss'],
})
export class PointsComponent {

  @Input() points: number = 2000; // Current points
  maxPoints: number = 6000; // Maximum points for meter

  get progressPercentage(): number {
    // Cap the progress to 100% if points exceed maxPoints
    return Math.min((this.points / this.maxPoints) * 100, 100);
  }
}
