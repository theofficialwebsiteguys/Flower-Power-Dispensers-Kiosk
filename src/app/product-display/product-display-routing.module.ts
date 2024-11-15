import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductDisplayPage } from './product-display.page';

const routes: Routes = [
  {
    path: '',
    component: ProductDisplayPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductDisplayPageRoutingModule {}
