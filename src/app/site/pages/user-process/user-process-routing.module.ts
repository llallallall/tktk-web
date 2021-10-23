import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserProcessComponent } from './user-process.component';

const routes: Routes = [
  {
    path: '',
    component: UserProcessComponent,
    children: [
      {
        path: '',
        redirectTo: 'i',
        pathMatch: 'full'
      },
      {
        path: 'i',
        loadChildren: () => import('./up-intro/up-intro.module')
          .then(m => m.UpIntroModule),
      },
      {
        path: 'cp',
        loadChildren: () => import('./up-change-pw/up-change-pw.module')
          .then(m => m.UpChangePwModule),
      },
      {
        path: 'dr',
        loadChildren: () => import('./up-dormant-release/up-dormant-release.module')
          .then(m => m.UpDormantReleaseModule),
      },
      {
        path: 'success',
        loadChildren: () => import('./up-success/up-success.module')
          .then(m => m.UpSuccessModule),
      },
      {
        path: 'fail',
        loadChildren: () => import('./up-fail/up-fail.module')
          .then(m => m.UpFailModule),
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserProcessRoutingModule { }
