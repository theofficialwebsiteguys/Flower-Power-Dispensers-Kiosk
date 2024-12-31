import { Component, Input } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-points',
  templateUrl: './points.component.html',
  styleUrls: ['./points.component.scss'],
})
export class PointsComponent {
  @Input() points: number = 0;
  maxPoints: number = 1000;
  @Input() isExclusiveMember: boolean = false;

  constructor(private authService: AuthService){}

  get progressPercentage(): number {
    return (this.points / this.maxPoints) * 100;
  }

  get progressSteps(): number[] {
    return [0, 250, 500, 750, this.maxPoints];
  }

}
