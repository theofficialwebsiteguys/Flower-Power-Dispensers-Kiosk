import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Tab1Page } from './tab1.page';

const routes: Routes = [
  {
    path: 'products',
    loadChildren: () =>
      import('../products/products.module').then((m) => m.ProductsPageModule),
  },
  {
    path: '',
    component: Tab1Page,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Tab1PageRoutingModule {}
