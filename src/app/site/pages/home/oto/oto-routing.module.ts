import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'list',
    pathMatch: 'full'
  },
  {
    path: 'list',
    loadChildren: () => import('./oto-list/oto-list.module')
      .then(m => m.OtoListModule),
  },
  {
    path: 'add',
    loadChildren: () => import('./oto-add/oto-add.module')
      .then(m => m.OtoAddModule),
  },
  {
    path: 'detail',
    loadChildren: () => import('./oto-detail/oto-detail.module')
      .then(m => m.OtoDetailModule),
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OtoRoutingModule { }
