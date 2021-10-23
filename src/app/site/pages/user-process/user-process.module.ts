import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserProcessRoutingModule } from './user-process-routing.module';
import { UserProcessComponent } from './user-process.component';
import { AppShareModule } from 'src/app/share/app-share/app-share.module';


@NgModule({
  declarations: [
    UserProcessComponent
  ],
  imports: [
    CommonModule,
    UserProcessRoutingModule,
    AppShareModule,
  ]
})
export class UserProcessModule { }
