import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostsAllComponent } from './posts-all.component';

const routes: Routes = [
  { path: '', component: PostsAllComponent, },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PostsAllRoutingModule { }
