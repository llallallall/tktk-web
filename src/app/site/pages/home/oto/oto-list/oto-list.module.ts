import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OtoListRoutingModule } from './oto-list-routing.module';
import { OtoListComponent } from './oto-list.component';
import { AppShareModule } from 'src/app/share/app-share/app-share.module';
import { OtoListFilterComponent } from './oto-list-filter/oto-list-filter.component';
import { QnaPasswdDlgComponent } from './qna-passwd-dlg/qna-passwd-dlg.component';


@NgModule({
  declarations: [
    OtoListComponent,
    OtoListFilterComponent,
    QnaPasswdDlgComponent
  ],
  imports: [
    CommonModule,
    OtoListRoutingModule,
    AppShareModule,
  ]
})
export class OtoListModule { }
