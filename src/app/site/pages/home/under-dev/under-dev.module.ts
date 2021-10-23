import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UnderDevRoutingModule } from './under-dev-routing.module';
import { UnderDevComponent } from './under-dev.component';
import { AppShareModule } from 'src/app/share/app-share/app-share.module';


@NgModule({
  declarations: [
    UnderDevComponent
  ],
  imports: [
    CommonModule,
    UnderDevRoutingModule,
    AppShareModule,
  ]
})
export class UnderDevModule { }
