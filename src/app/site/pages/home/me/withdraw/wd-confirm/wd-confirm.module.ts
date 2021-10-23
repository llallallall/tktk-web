import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WdConfirmRoutingModule } from './wd-confirm-routing.module';
import { WdConfirmComponent } from './wd-confirm.component';
import { AppShareModule } from 'src/app/share/app-share/app-share.module';
import { WdConfirmDlgComponent } from './wd-confirm-dlg/wd-confirm-dlg.component';


@NgModule({
  declarations: [
    WdConfirmComponent,
    WdConfirmDlgComponent
  ],
  imports: [
    CommonModule,
    WdConfirmRoutingModule,
    AppShareModule,
  ]
})
export class WdConfirmModule { }
