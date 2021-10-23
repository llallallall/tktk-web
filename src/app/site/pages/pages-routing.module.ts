import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PagesComponent } from './pages.component';

const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    children: [
      {
        path: '',
        redirectTo: 'i',
        pathMatch: 'full'
      },
      {
        path: 'a',
        loadChildren: () => import('./auth/auth.module')
          .then(m => m.AuthModule),
      },
      {
        path: 'up',
        loadChildren: () => import('./user-process/user-process.module')
          .then(m => m.UserProcessModule),
      },
      {
        path: 'h',
        loadChildren: () => import('./home/home.module')
          .then(m => m.HomeModule),
        // canActivate: [AuthGuard],
      },
      {
        path: 'i',
        loadChildren: () => import('./intro/intro.module')
          .then(m => m.IntroModule),
      },
      {
        path: 'pdf',
        loadChildren: () => import('./cu-pdf/cu-pdf.module')
          .then(m => m.CuPdfModule),
      },
      {
        path: 'design',
        loadChildren: () => import('./ui-design/ui-design.module')
          .then(m => m.UiDesignModule),
      },
    ],
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
