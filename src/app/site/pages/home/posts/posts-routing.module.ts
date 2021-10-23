import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'detail',
    pathMatch: 'full'
  },
  {
    path: 'detail',
    loadChildren: () => import('./post-detail/post-detail.module')
      .then(m => m.PostDetailModule),
  },
  {
    path: 'add',
    loadChildren: () => import('./post-add/post-add.module')
      .then(m => m.PostAddModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PostsRoutingModule { }
