import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MyInfoEditComponent } from './my-info-edit.component';

const routes: Routes = [
  { path: '', component: MyInfoEditComponent, },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MyInfoEditRoutingModule { }
