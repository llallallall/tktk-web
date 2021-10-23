import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UpIntroRoutingModule } from './up-intro-routing.module';
import { UpIntroComponent } from './up-intro.component';
import { AppShareModule } from 'src/app/share/app-share/app-share.module';


@NgModule({
  declarations: [
    UpIntroComponent
  ],
  imports: [
    CommonModule,
    UpIntroRoutingModule,
    AppShareModule,
  ]
})
export class UpIntroModule { }
