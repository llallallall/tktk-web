import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PostsAllRoutingModule } from './posts-all-routing.module';
import { PostsAllComponent } from './posts-all.component';
import { AppShareModule } from 'src/app/share/app-share/app-share.module';
import { PaListItemComponent } from './pa-list-item/pa-list-item.component';
import { PalistItemVideoComponent } from './palist-item-video/palist-item-video.component';
import { PalistItemImgComponent } from './palist-item-img/palist-item-img.component';
import { PalistItemAllComponent } from './palist-item-all/palist-item-all.component';
import { YouTubePlayerModule } from '@angular/youtube-player';
import { NoticeListItemComponent } from './notice-list-item/notice-list-item.component';
import { PalistItemNoticeComponent } from './palist-item-notice/palist-item-notice.component';

@NgModule({
  declarations: [
    PostsAllComponent,
    PaListItemComponent,
    PalistItemVideoComponent,
    PalistItemImgComponent,
    PalistItemAllComponent,
    NoticeListItemComponent,
    PalistItemNoticeComponent
  ],
  imports: [
    CommonModule,
    PostsAllRoutingModule,
    AppShareModule,
    YouTubePlayerModule,
  ]
})
export class PostsAllModule { }
