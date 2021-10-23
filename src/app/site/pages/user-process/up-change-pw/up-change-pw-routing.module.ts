import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UpChangePwComponent } from './up-change-pw.component';

const routes: Routes = [
  { path: '', component: UpChangePwComponent, },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UpChangePwRoutingModule { }
