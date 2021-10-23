import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PostAddRoutingModule } from './post-add-routing.module';
import { PostAddComponent } from './post-add.component';
import { AppShareModule } from 'src/app/share/app-share/app-share.module';


@NgModule({
  declarations: [
    PostAddComponent
  ],
  imports: [
    CommonModule,
    PostAddRoutingModule,
    AppShareModule,
  ]
})
export class PostAddModule { }
