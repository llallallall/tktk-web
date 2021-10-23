import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UpChangePwRoutingModule } from './up-change-pw-routing.module';
import { UpChangePwComponent } from './up-change-pw.component';
import { AppShareModule } from 'src/app/share/app-share/app-share.module';


@NgModule({
  declarations: [
    UpChangePwComponent
  ],
  imports: [
    CommonModule,
    UpChangePwRoutingModule,
    AppShareModule,
  ]
})
export class UpChangePwModule { }
