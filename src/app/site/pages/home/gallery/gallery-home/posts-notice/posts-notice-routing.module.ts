import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostsNoticeComponent } from './posts-notice.component';

const routes: Routes = [
  { path: '', component: PostsNoticeComponent, },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PostsNoticeRoutingModule { }
