import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'passwd',
    pathMatch: 'full'
  },
  {
    path: 'passwd',
    loadChildren: () => import('./wd-passwd/wd-passwd.module')
      .then(m => m.WdPasswdModule),
  },
  {
    path: 'confirm',
    loadChildren: () => import('./wd-confirm/wd-confirm.module')
      .then(m => m.WdConfirmModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WithdrawRoutingModule { }
