import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-banner-carousel',
  templateUrl: './banner-carousel.component.html',
  styleUrls: ['./banner-carousel.component.scss'],
})
export class BannerCarouselComponent implements OnInit, OnDestroy {
  banners = [
    {
      image: 'assets/flower-power-banner.webp',
      title: 'Where Passion Meets Potency',
      description: 'Flower Power Dispensary',
    },
    {
      image: 'assets/fp-2.jpg',
      title: 'Where Passion Meets Potency',
      description: 'Flower Power Dispensary',
    },
    {
      image: 'assets/fp-3.jpg',
      title: 'Where Passion Meets Potency',
      description: 'Flower Power Dispensary',
    },
  ];

  currentIndex = 0;
  interval: any;

  ngOnInit(): void {
    this.startCarousel();
  }

  startCarousel() {
    this.interval = setInterval(() => {
      this.currentIndex = (this.currentIndex + 1) % this.banners.length;
    }, 6000);
  }

  ngOnDestroy(): void {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }
}
