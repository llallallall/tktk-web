import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MyInfoEditRoutingModule } from './my-info-edit-routing.module';
import { MyInfoEditComponent } from './my-info-edit.component';
import { AppShareModule } from 'src/app/share/app-share/app-share.module';


@NgModule({
  declarations: [
    MyInfoEditComponent
  ],
  imports: [
    CommonModule,
    MyInfoEditRoutingModule,
    AppShareModule,
  ]
})
export class MyInfoEditModule { }
