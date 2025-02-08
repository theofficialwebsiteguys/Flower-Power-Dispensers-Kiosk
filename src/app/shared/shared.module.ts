import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HeaderComponent } from '../header/header.component';
import { ProductListComponent } from '../product-list/product-list.component';
import { ProductComponent } from '../product/product.component';
import { ProductCategoriesComponent } from '../product-categories/product-categories.component';
import { ProductCategoryComponent } from '../product-category/product-category.component';
import { ProductFiltersComponent } from '../product-filters/product-filters.component';
import { BannerCarouselComponent } from '../banner-carousel/banner-carousel.component';
import { RouterModule } from '@angular/router';
import { RegisterComponent } from '../register/register.component';

@NgModule({
  declarations: [
    HeaderComponent,
    ProductListComponent,
    ProductComponent,
    ProductCategoriesComponent,
    ProductCategoryComponent,
    ProductFiltersComponent,
    BannerCarouselComponent,
    RegisterComponent
  ],
  imports: [CommonModule, IonicModule, FormsModule, RouterModule, ReactiveFormsModule],
  exports: [
    HeaderComponent,
    ProductListComponent,
    ProductComponent,
    ProductCategoriesComponent,
    ProductCategoryComponent,
    ProductFiltersComponent,
    BannerCarouselComponent,
    RegisterComponent
  ],
})
export class SharedModule {}
