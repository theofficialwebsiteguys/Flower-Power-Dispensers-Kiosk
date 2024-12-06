import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-points',
  templateUrl: './points.component.html',
  styleUrls: ['./points.component.scss'],
})
export class PointsComponent {
  @Input() points: number = 1200;
  maxPoints: number = 6000;
  isExclusiveMember: boolean = false;

  get progressPercentage(): number {
    return (this.points / this.maxPoints) * 100;
  }

  get progressSteps(): number[] {
    return [0, 1500, 3000, 4500, this.maxPoints];
  }
}
