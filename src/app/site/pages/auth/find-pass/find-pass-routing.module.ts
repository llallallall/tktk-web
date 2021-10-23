import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FindPassComponent } from './find-pass.component';

const routes: Routes = [
  { path: '', component: FindPassComponent, },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FindPassRoutingModule { }
