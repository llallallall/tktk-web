import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FindPassRoutingModule } from './find-pass-routing.module';
import { FindPassComponent } from './find-pass.component';
import { AppShareModule } from 'src/app/share/app-share/app-share.module';


@NgModule({
  declarations: [
    FindPassComponent
  ],
  imports: [
    CommonModule,
    FindPassRoutingModule,
    AppShareModule,
  ]
})
export class FindPassModule { }
