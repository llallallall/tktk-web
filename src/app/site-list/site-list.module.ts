import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SiteListRoutingModule } from './site-list-routing.module';
import { SiteListComponent } from './site-list.component';
import { AppShareModule } from '../share/app-share/app-share.module';


@NgModule({
  declarations: [
    SiteListComponent
  ],
  imports: [
    CommonModule,
    SiteListRoutingModule,
    AppShareModule,
  ]
})
export class SiteListModule { }
