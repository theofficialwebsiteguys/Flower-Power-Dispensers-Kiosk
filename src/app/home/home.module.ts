import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { HomePageRoutingModule } from './home-routing.module';
import { CardSliderComponent } from '../card-slider/card-slider.component';
import { BannerCarouselComponent } from '../banner-carousel/banner-carousel.component';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    HomePageRoutingModule
  ],
  declarations: [HomePage, CardSliderComponent, BannerCarouselComponent]
})
export class HomePageModule {}
