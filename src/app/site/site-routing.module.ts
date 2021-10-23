import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SiteComponent } from './site.component';

const routes: Routes = [
  {
    path: '',
    component: SiteComponent,
    children: [
      {
        path: '',
        redirectTo: 'p',
        pathMatch: 'full'
      },
      {
        path: 'p',
        loadChildren: () => import('./pages/pages.module')
          .then(m => m.PagesModule),
      },
      {
        path: 'admin',
        loadChildren: () => import('./admin/admin.module')
          .then(m => m.AdminModule),
      },      
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SiteRoutingModule { }
