import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'sign-in',
    pathMatch: 'full'
  },
  {
    path: 'sign-in',
    loadChildren: () => import('./sign-in/sign-in.module')
      .then(m => m.SignInModule),
  },
  {
    path: 'sign-up',
    loadChildren: () => import('./sign-up/sign-up.module')
      .then(m => m.SignUpModule),
  },
  {
    path: 'find-pass',
    loadChildren: () => import('./find-pass/find-pass.module')
      .then(m => m.FindPassModule),
  },
  {
    path: 'dormant-release',
    loadChildren: () => import('./dormant-release/dormant-release.module')
      .then(m => m.DormantReleaseModule),
  },
  {
    path: 'pass-exceed',
    loadChildren: () => import('./pass-exceed/pass-exceed.module')
      .then(m => m.PassExceedModule),
  },
  {
    path: 'navercb',
    loadChildren: () => import('./navercb/navercb.module')
      .then(m => m.NavercbModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
