import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UpDormantReleaseRoutingModule } from './up-dormant-release-routing.module';
import { UpDormantReleaseComponent } from './up-dormant-release.component';
import { AppShareModule } from 'src/app/share/app-share/app-share.module';


@NgModule({
  declarations: [
    UpDormantReleaseComponent
  ],
  imports: [
    CommonModule,
    UpDormantReleaseRoutingModule,
    AppShareModule,
  ]
})
export class UpDormantReleaseModule { }
