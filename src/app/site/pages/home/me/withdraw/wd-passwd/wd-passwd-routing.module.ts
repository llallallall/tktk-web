import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WdPasswdComponent } from './wd-passwd.component';

const routes: Routes = [
  { path: '', component: WdPasswdComponent, },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WdPasswdRoutingModule { }
