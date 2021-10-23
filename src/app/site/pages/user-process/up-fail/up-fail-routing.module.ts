import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UpFailComponent } from './up-fail.component';

const routes: Routes = [
  { path: '', component: UpFailComponent, },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UpFailRoutingModule { }
