import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-banner-carousel',
  templateUrl: './banner-carousel.component.html',
  styleUrls: ['./banner-carousel.component.scss'],
})
export class BannerCarouselComponent implements OnInit, OnDestroy {
  banners = [
    {
      image: 'https://storage.cloud.google.com/the-website-guys/Flower-Power/carousel0.jpg',
      title: 'Where Passion Meets Potency',
      description: 'Flower Power Dispensary',
    },
    {
      image: 'https://storage.cloud.google.com/the-website-guys/Flower-Power/carousel1.jpg',
      title: 'Flower Power Counter Display',
      description: 'Flower Power Dispensary',
    },
    {
      image: 'https://storage.cloud.google.com/the-website-guys/Flower-Power/carousel2.jpg',
      title: 'Flower Power Sign',
      description: 'Flower Power Dispensary',
    },
    {
      image: 'https://storage.cloud.google.com/the-website-guys/Flower-Power/carousel3.jpg',
      title: 'Dank Display',
      description: 'Flower Power Dispensary',
    },
    {
      image: 'https://storage.cloud.google.com/the-website-guys/Flower-Power/carousel4.jpg',
      title: 'Bodega Boyz Display',
      description: 'Flower Power Dispensary',
    },
    {
      image: 'https://storage.cloud.google.com/the-website-guys/Flower-Power/carousel5.jpg',
      title: 'Toke Folks Display',
      description: 'Flower Power Dispensary',
    },
    {
      image: 'https://storage.cloud.google.com/the-website-guys/Flower-Power/carousel6.jpg',
      title: 'Bodega Boyz Display 2',
      description: 'Flower Power Dispensary',
    },
    {
      image: 'https://storage.cloud.google.com/the-website-guys/Flower-Power/carousel7.jpg',
      title: 'Hurley Grown Display',
      description: 'Flower Power Dispensary',
    },
    {
      image: 'https://storage.cloud.google.com/the-website-guys/Flower-Power/carousel8.jpg',
      title: 'MFNY Display',
      description: 'Flower Power Dispensary',
    },
    {
      image: 'https://storage.cloud.google.com/the-website-guys/Flower-Power/carousel9.jpg',
      title: 'Flower Display',
      description: 'Flower Power Dispensary',
    },
    {
      image: 'https://storage.cloud.google.com/the-website-guys/Flower-Power/carousel10.jpg',
      title: 'Display Case',
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
