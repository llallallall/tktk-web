import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UpSuccessRoutingModule } from './up-success-routing.module';
import { UpSuccessComponent } from './up-success.component';
import { AppShareModule } from 'src/app/share/app-share/app-share.module';


@NgModule({
  declarations: [
    UpSuccessComponent
  ],
  imports: [
    CommonModule,
    UpSuccessRoutingModule,
    AppShareModule,
  ]
})
export class UpSuccessModule { }
