import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PostsNoticeRoutingModule } from './posts-notice-routing.module';
import { PostsNoticeComponent } from './posts-notice.component';
import { AppShareModule } from 'src/app/share/app-share/app-share.module';


@NgModule({
  declarations: [
    PostsNoticeComponent
  ],
  imports: [
    CommonModule,
    PostsNoticeRoutingModule,
    AppShareModule,
  ]
})
export class PostsNoticeModule { }
