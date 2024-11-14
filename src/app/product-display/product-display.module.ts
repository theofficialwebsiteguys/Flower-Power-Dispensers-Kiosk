import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProductDisplayPageRoutingModule } from './product-display-routing.module';

import { ProductDisplayPage } from './product-display.page';
import { SingleProductComponent } from '../single-product/single-product.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProductDisplayPageRoutingModule,
    SharedModule
  ],
  declarations: [ProductDisplayPage, SingleProductComponent]
})
export class ProductDisplayPageModule {}
