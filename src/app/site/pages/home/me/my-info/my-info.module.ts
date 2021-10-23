import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MyInfoRoutingModule } from './my-info-routing.module';
import { MyInfoComponent } from './my-info.component';
import { AppShareModule } from 'src/app/share/app-share/app-share.module';


@NgModule({
  declarations: [
    MyInfoComponent
  ],
  imports: [
    CommonModule,
    MyInfoRoutingModule,
    AppShareModule,   
  ]
})
export class MyInfoModule { }
