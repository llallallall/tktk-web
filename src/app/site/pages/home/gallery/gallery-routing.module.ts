import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'gh',
    pathMatch: 'full'
  },
  {
    path: 'gh',
    loadChildren: () => import('./gallery-home/gallery-home.module')
      .then(m => m.GalleryHomeModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GalleryRoutingModule { }
