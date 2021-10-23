import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GalleryHomeRoutingModule } from './gallery-home-routing.module';
import { GalleryHomeComponent } from './gallery-home.component';
import { AppShareModule } from 'src/app/share/app-share/app-share.module';


@NgModule({
  declarations: [
    GalleryHomeComponent
  ],
  imports: [
    CommonModule,
    GalleryHomeRoutingModule,
    AppShareModule,
  ]
})
export class GalleryHomeModule { }
