import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostsHotComponent } from './posts-hot.component';

const routes: Routes = [
  { path: '', component: PostsHotComponent, },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PostsHotRoutingModule { }
