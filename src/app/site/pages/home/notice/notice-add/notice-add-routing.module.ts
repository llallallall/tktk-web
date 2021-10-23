import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NoticeAddComponent } from './notice-add.component';

const routes: Routes = [
  { path: '', component: NoticeAddComponent, },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NoticeAddRoutingModule { }
