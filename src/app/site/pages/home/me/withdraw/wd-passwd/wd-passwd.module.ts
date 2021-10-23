import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WdPasswdRoutingModule } from './wd-passwd-routing.module';
import { WdPasswdComponent } from './wd-passwd.component';
import { AppShareModule } from 'src/app/share/app-share/app-share.module';


@NgModule({
  declarations: [
    WdPasswdComponent
  ],
  imports: [
    CommonModule,
    WdPasswdRoutingModule,
    AppShareModule,
  ]
})
export class WdPasswdModule { }
