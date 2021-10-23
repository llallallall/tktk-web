import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NoticeListRoutingModule } from './notice-list-routing.module';
import { NoticeListComponent } from './notice-list.component';
import { AppShareModule } from 'src/app/share/app-share/app-share.module';


@NgModule({
  declarations: [
    NoticeListComponent
  ],
  imports: [
    CommonModule,
    NoticeListRoutingModule,
    AppShareModule,
  ]
})
export class NoticeListModule { }
