import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GalleryHomeComponent } from './gallery-home.component';

const routes: Routes = [
  {
    path: '',
    component: GalleryHomeComponent,
    children: [
      {
        path: '',
        redirectTo: 'all',
        pathMatch: 'full'
      },
      {
        path: 'all',
        loadChildren: () => import('./posts-all/posts-all.module')
          .then(m => m.PostsAllModule),
      },
      {
        path: 'hot',
        loadChildren: () => import('./posts-hot/posts-hot.module')
          .then(m => m.PostsHotModule),
      },
      {
        path: 'notice',
        loadChildren: () => import('./gallery-notice/gallery-notice.module')
          .then(m => m.GalleryNoticeModule),
      },
    ]
  },
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GalleryHomeRoutingModule { }
