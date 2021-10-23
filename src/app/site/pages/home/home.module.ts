import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { HomeMenuComponent } from './widgets/home-menu/home-menu.component';
import { HomeMenuItemComponent } from './widgets/home-menu-item/home-menu-item.component';
import { AppShareModule } from 'src/app/share/app-share/app-share.module';
import { HmCategoryComponent } from './widgets/hm-category/hm-category.component';


@NgModule({
  declarations: [
    HomeComponent,
    HomeMenuComponent,
    HomeMenuItemComponent,
    HmCategoryComponent,
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    AppShareModule,
  ]
})
export class HomeModule { }
