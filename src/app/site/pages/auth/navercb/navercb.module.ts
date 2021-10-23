import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NavercbRoutingModule } from './navercb-routing.module';
import { NavercbComponent } from './navercb.component';
import { AppShareModule } from 'src/app/share/app-share/app-share.module';


@NgModule({
  declarations: [
    NavercbComponent
  ],
  imports: [
    CommonModule,
    NavercbRoutingModule,
    AppShareModule,
  ]
})
export class NavercbModule { }
