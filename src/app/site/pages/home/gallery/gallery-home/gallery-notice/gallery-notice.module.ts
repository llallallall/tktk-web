import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GalleryNoticeRoutingModule } from './gallery-notice-routing.module';
import { GalleryNoticeComponent } from './gallery-notice.component';
import { AppShareModule } from 'src/app/share/app-share/app-share.module';


@NgModule({
  declarations: [
    GalleryNoticeComponent
  ],
  imports: [
    CommonModule,
    GalleryNoticeRoutingModule,
    AppShareModule,
  ]
})
export class GalleryNoticeModule { }
