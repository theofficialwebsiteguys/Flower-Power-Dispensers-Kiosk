import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { HomePageRoutingModule } from './home-routing.module';
import { CardSliderComponent } from '../card-slider/card-slider.component';
import { BannerCarouselComponent } from '../banner-carousel/banner-carousel.component';

import { SharedModule } from '../shared/shared.module';
import { ProductCategoriesComponent } from '../product-categories/product-categories.component';
import { ProductsPage } from '../products/products.page';
import { ProductCategoryComponent } from '../product-category/product-category.component';
import { ProductFiltersComponent } from '../product-filters/product-filters.component';
import { ProductListComponent } from '../product-list/product-list.component';
import { ProductComponent } from '../product/product.component';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    HomePageRoutingModule,
    SharedModule,
  ],
  declarations: [HomePage, CardSliderComponent, BannerCarouselComponent, ProductCategoriesComponent, ProductsPage,     ProductCategoryComponent,
    ProductListComponent,
    ProductComponent,
    ProductFiltersComponent],
})
export class HomePageModule {}
