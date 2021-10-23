import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PostsHotRoutingModule } from './posts-hot-routing.module';
import { PostsHotComponent } from './posts-hot.component';
import { AppShareModule } from 'src/app/share/app-share/app-share.module';


@NgModule({
  declarations: [
    PostsHotComponent
  ],
  imports: [
    CommonModule,
    PostsHotRoutingModule,
    AppShareModule,
  ]
})
export class PostsHotModule { }
