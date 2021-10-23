import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NoticeAddRoutingModule } from './notice-add-routing.module';
import { NoticeAddComponent } from './notice-add.component';
import { AppShareModule } from 'src/app/share/app-share/app-share.module';


@NgModule({
  declarations: [
    NoticeAddComponent
  ],
  imports: [
    CommonModule,
    NoticeAddRoutingModule,
    AppShareModule,
  ]
})
export class NoticeAddModule { }
