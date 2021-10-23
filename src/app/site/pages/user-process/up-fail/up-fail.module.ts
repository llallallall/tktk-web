import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UpFailRoutingModule } from './up-fail-routing.module';
import { UpFailComponent } from './up-fail.component';
import { AppShareModule } from 'src/app/share/app-share/app-share.module';


@NgModule({
  declarations: [
    UpFailComponent
  ],
  imports: [
    CommonModule,
    UpFailRoutingModule,
    AppShareModule,
  ]
})
export class UpFailModule { }
