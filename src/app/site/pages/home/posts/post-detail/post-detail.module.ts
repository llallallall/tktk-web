import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PostDetailRoutingModule } from './post-detail-routing.module';
import { PostDetailComponent } from './post-detail.component';
import { AppShareModule } from 'src/app/share/app-share/app-share.module';


@NgModule({
  declarations: [
    PostDetailComponent
  ],
  imports: [
    CommonModule,
    PostDetailRoutingModule,
    AppShareModule,
  ]
})
export class PostDetailModule { }
