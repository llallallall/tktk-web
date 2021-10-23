import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UidzColorsRoutingModule } from './uidz-colors-routing.module';
import { UidzColorsComponent } from './uidz-colors.component';
import { AppShareModule } from 'src/app/share/app-share/app-share.module';
import { ColorItemComponent } from './color-item/color-item.component';


@NgModule({
  declarations: [
    UidzColorsComponent,
    ColorItemComponent
  ],
  imports: [
    CommonModule,
    UidzColorsRoutingModule,
    AppShareModule,
  ]
})
export class UidzColorsModule { }
