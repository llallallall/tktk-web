import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OtoAddRoutingModule } from './oto-add-routing.module';
import { OtoAddComponent } from './oto-add.component';
import { AppShareModule } from 'src/app/share/app-share/app-share.module';


@NgModule({
  declarations: [
    OtoAddComponent
  ],
  imports: [
    CommonModule,
    OtoAddRoutingModule,
    AppShareModule,
  ]
})
export class OtoAddModule { }
