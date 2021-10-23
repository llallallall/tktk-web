import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OtoDetailRoutingModule } from './oto-detail-routing.module';
import { OtoDetailComponent } from './oto-detail.component';
import { AppShareModule } from 'src/app/share/app-share/app-share.module';


@NgModule({
  declarations: [
    OtoDetailComponent
  ],
  imports: [
    CommonModule,
    OtoDetailRoutingModule,
    AppShareModule,
  ]
})
export class OtoDetailModule { }
