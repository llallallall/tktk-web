import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: '',
        redirectTo: 'main',
        pathMatch: 'full'
      },
      {
        path: 'under-dev',
        loadChildren: () => import('./under-dev/under-dev.module')
          .then(m => m.UnderDevModule),
      },
      {
        path: 'main',
        loadChildren: () => import('./main/main.module')
          .then(m => m.MainModule),
      },
      {
        path: 'me',
        loadChildren: () => import('./me/me.module')
          .then(m => m.MeModule),
      },
      {
        path: 'gallery',
        loadChildren: () => import('./gallery/gallery.module')
          .then(m => m.GalleryModule),
      },
      {
        path: 'notice',
        loadChildren: () => import('./notice/notice.module')
          .then(m => m.NoticeModule),
      },
      {
        path: 'oto',
        loadChildren: () => import('./oto/oto.module')
          .then(m => m.OtoModule),
      },
      {
        path: 'posts',
        loadChildren: () => import('./posts/posts.module')
          .then(m => m.PostsModule),
      },
      {
        path: 'search',
        loadChildren: () => import('./search-result/search-result.module')
          .then(m => m.SearchResultModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
