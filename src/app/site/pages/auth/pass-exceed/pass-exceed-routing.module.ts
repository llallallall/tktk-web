import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PassExceedComponent } from './pass-exceed.component';

const routes: Routes = [
  { path: '', component: PassExceedComponent, },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PassExceedRoutingModule { }
