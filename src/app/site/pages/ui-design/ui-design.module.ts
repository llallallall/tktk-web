import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UiDesignRoutingModule } from './ui-design-routing.module';
import { AppShareModule } from 'src/app/share/app-share/app-share.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    UiDesignRoutingModule,
    AppShareModule,
  ]
})
export class UiDesignModule { }
