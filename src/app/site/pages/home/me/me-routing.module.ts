import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'info',
    pathMatch: 'full'
  },
  {
    path: 'info',
    loadChildren: () => import('./my-info/my-info.module')
      .then(m => m.MyInfoModule),
  },
  {
    path: 'edit',
    loadChildren: () => import('./my-info-edit/my-info-edit.module')
      .then(m => m.MyInfoEditModule),
  },
  {
    path: 'wd',
    loadChildren: () => import('./withdraw/withdraw.module')
      .then(m => m.WithdrawModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MeRoutingModule { }
