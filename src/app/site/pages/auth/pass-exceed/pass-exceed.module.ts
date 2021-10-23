import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PassExceedRoutingModule } from './pass-exceed-routing.module';
import { PassExceedComponent } from './pass-exceed.component';
import { AppShareModule } from 'src/app/share/app-share/app-share.module';


@NgModule({
  declarations: [
    PassExceedComponent
  ],
  imports: [
    CommonModule,
    PassExceedRoutingModule,
    AppShareModule,
  ]
})
export class PassExceedModule { }
