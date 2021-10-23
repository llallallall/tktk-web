import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostAddComponent } from './post-add.component';

const routes: Routes = [
  { path: '', component: PostAddComponent, },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PostAddRoutingModule { }
