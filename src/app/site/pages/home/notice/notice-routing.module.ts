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
    loadChildren: () => import('./notice-list/notice-list.module')
      .then(m => m.NoticeListModule),
  },
  {
    path: 'detail',
    loadChildren: () => import('./notice-detail/notice-detail.module')
      .then(m => m.NoticeDetailModule),
  },
  {
    path: 'add',
    loadChildren: () => import('./notice-add/notice-add.module')
      .then(m => m.NoticeAddModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NoticeRoutingModule { }
