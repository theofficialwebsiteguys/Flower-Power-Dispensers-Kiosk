import { Component, OnInit, OnDestroy } from '@angular/core';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-banner-carousel',
  templateUrl: './banner-carousel.component.html',
  styleUrls: ['./banner-carousel.component.scss'],
})
export class BannerCarouselComponent implements OnInit, OnDestroy {
  // banners = [
  //   {
  //     image: 'https://storage.cloud.google.com/the-website-guys/Flower-Power/carousel0.jpg',
  //     title: 'Where Passion Meets Potency',
  //     description: 'Flower Power Dispensary',
  //   },
  //   {
  //     image: 'https://storage.cloud.google.com/the-website-guys/Flower-Power/carousel1.jpg',
  //     title: 'Flower Power Counter Display',
  //     description: 'Flower Power Dispensary',
  //   },
  //   {
  //     image: 'https://storage.cloud.google.com/the-website-guys/Flower-Power/carousel2.jpg',
  //     title: 'Flower Power Sign',
  //     description: 'Flower Power Dispensary',
  //   },
  //   {
  //     image: 'https://storage.cloud.google.com/the-website-guys/Flower-Power/carousel3.jpg',
  //     title: 'Dank Display',
  //     description: 'Flower Power Dispensary',
  //   },
  //   {
  //     image: 'https://storage.cloud.google.com/the-website-guys/Flower-Power/carousel4.jpg',
  //     title: 'Bodega Boyz Display',
  //     description: 'Flower Power Dispensary',
  //   },
  //   {
  //     image: 'https://storage.cloud.google.com/the-website-guys/Flower-Power/carousel5.jpg',
  //     title: 'Toke Folks Display',
  //     description: 'Flower Power Dispensary',
  //   },
  //   {
  //     image: 'https://storage.cloud.google.com/the-website-guys/Flower-Power/carousel6.jpg',
  //     title: 'Bodega Boyz Display 2',
  //     description: 'Flower Power Dispensary',
  //   },
  //   {
  //     image: 'https://storage.cloud.google.com/the-website-guys/Flower-Power/carousel7.jpg',
  //     title: 'Hurley Grown Display',
  //     description: 'Flower Power Dispensary',
  //   },
  //   {
  //     image: 'https://storage.cloud.google.com/the-website-guys/Flower-Power/carousel8.jpg',
  //     title: 'MFNY Display',
  //     description: 'Flower Power Dispensary',
  //   },
  //   {
  //     image: 'https://storage.cloud.google.com/the-website-guys/Flower-Power/carousel9.jpg',
  //     title: 'Flower Display',
  //     description: 'Flower Power Dispensary',
  //   },
  //   {
  //     image: 'https://storage.cloud.google.com/the-website-guys/Flower-Power/carousel10.jpg',
  //     title: 'Display Case',
  //     description: 'Flower Power Dispensary',
  //   },
  // ];
  banners: { image: string; title: string; description: string }[] = [];
  currentIndex = 0;
  interval: any;

  constructor(private adminService: AdminService) {}
  
  ngOnInit(): void {
    this.loadCarouselImages();
    this.startCarousel();
  }

  loadCarouselImages() {
    this.adminService.getCarouselImages().subscribe(
      response => {
        this.banners = response.images.map((imgUrl, index) => ({
          image: `${imgUrl}?v=${new Date().getTime()}`, // Cache-busting
          title: `Carousel Image ${index + 1}`,
          description: 'Flower Power Dispensary',
        }));
      },
      error => {
        console.error('Error fetching carousel images:', error);
      }
    );
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
