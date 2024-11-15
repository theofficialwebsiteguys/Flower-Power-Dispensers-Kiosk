import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProductsPageRoutingModule } from './products-routing.module';

import { ProductsPage } from './products.page';

import { ProductCategoriesComponent } from '../product-categories/product-categories.component';
import { ProductCategoryComponent } from '../product-category/product-category.component';
import { ProductListComponent } from '../product-list/product-list.component';
import { ProductComponent } from '../product/product.component';
import { ProductFiltersComponent } from '../product-filters/product-filters.component';

import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProductsPageRoutingModule,
    SharedModule
  ],
  declarations: [ProductsPage ],
})
export class ProductsPageModule {}
