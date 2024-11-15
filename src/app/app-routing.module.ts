import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./tabs/tabs.module').then((m) => m.TabsPageModule),
  },  {
    path: 'product-display',
    loadChildren: () => import('./product-display/product-display.module').then( m => m.ProductDisplayPageModule)
  },
  {
    path: 'rewards',
    loadChildren: () => import('./rewards/rewards.module').then( m => m.RewardsPageModule)
  },

];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
