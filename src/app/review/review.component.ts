import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss'],
})
export class ReviewComponent {

  reviewComment: string = '';
  googleReviewUrl: string = 'https://search.google.com/local/writereview?placeid=ChIJaewyJiZZwokRRTvQ3pXjVZk'; // Replace with your actual Google Review link

  leaveReview() {
    window.open(this.googleReviewUrl, '_blank');
  }
}
