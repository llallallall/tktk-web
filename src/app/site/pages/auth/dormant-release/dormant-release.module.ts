import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DormantReleaseRoutingModule } from './dormant-release-routing.module';
import { DormantReleaseComponent } from './dormant-release.component';
import { AppShareModule } from 'src/app/share/app-share/app-share.module';


@NgModule({
  declarations: [
    DormantReleaseComponent
  ],
  imports: [
    CommonModule,
    DormantReleaseRoutingModule,
    AppShareModule,
  ]
})
export class DormantReleaseModule { }
