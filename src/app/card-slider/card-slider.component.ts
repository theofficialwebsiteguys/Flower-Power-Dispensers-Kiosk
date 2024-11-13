import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-card-slider',
  templateUrl: './card-slider.component.html',
  styleUrls: ['./card-slider.component.scss'],
})
export class CardSliderComponent {
  categories = [
    {
      title: 'Concierge Picks',
      cards: [
        { image: 'assets/default.jpg', title: 'Special 1' },
        { image: 'assets/default.jpg', title: 'Special 2' },
        { image: 'assets/default.jpg', title: 'Special 2' },
        { image: 'assets/default.jpg', title: 'Special 2' },
        { image: 'assets/default.jpg', title: 'Special 2' },
        { image: 'assets/default.jpg', title: 'Special 2' },
        // Add more cards for Specials
      ],
    },
    {
      title: 'Specials',
      cards: [
        { image: 'assets/default.jpg', title: 'Staff Pick 1' },
        { image: 'assets/default.jpg', title: 'Staff Pick 2' },
        { image: 'assets/default.jpg', title: 'Staff Pick 2' },
        { image: 'assets/default.jpg', title: 'Staff Pick 2' },
        { image: 'assets/default.jpg', title: 'Staff Pick 2' },
        { image: 'assets/default.jpg', title: 'Staff Pick 2' },
        // Add more cards for Staff Picks
      ],
    },
    {
      title: 'Flower',
      cards: [
        { image: 'assets/default.jpg', title: 'Staff Pick 1' },
        { image: 'assets/default.jpg', title: 'Staff Pick 2' },
        { image: 'assets/default.jpg', title: 'Staff Pick 2' },
        { image: 'assets/default.jpg', title: 'Staff Pick 2' },
        { image: 'assets/default.jpg', title: 'Staff Pick 2' },
        { image: 'assets/default.jpg', title: 'Staff Pick 2' },
        // Add more cards for Flower
      ],
    },
    {
      title: 'Pre-Rolls',
      cards: [
        { image: 'assets/default.jpg', title: 'Staff Pick 1' },
        { image: 'assets/default.jpg', title: 'Staff Pick 2' },
        { image: 'assets/default.jpg', title: 'Staff Pick 2' },
        { image: 'assets/default.jpg', title: 'Staff Pick 2' },
        { image: 'assets/default.jpg', title: 'Staff Pick 2' },
        { image: 'assets/default.jpg', title: 'Staff Pick 2' },
        // Add more cards for Pre-Rolls
      ],
    },
    {
      title: 'Edibles',
      cards: [
        { image: 'assets/default.jpg', title: 'Staff Pick 1' },
        { image: 'assets/default.jpg', title: 'Staff Pick 2' },
        { image: 'assets/default.jpg', title: 'Staff Pick 2' },
        { image: 'assets/default.jpg', title: 'Staff Pick 2' },
        { image: 'assets/default.jpg', title: 'Staff Pick 2' },
        { image: 'assets/default.jpg', title: 'Staff Pick 2' },
        // Add more cards for Edibles
      ],
    },
    
    // Add more categories as needed
  ];
  
  
}
