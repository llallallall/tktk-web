import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NoticeDetailRoutingModule } from './notice-detail-routing.module';
import { NoticeDetailComponent } from './notice-detail.component';
import { AppShareModule } from 'src/app/share/app-share/app-share.module';


@NgModule({
  declarations: [
    NoticeDetailComponent
  ],
  imports: [
    CommonModule,
    NoticeDetailRoutingModule,
    AppShareModule,
  ]
})
export class NoticeDetailModule { }
