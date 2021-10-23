import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SearchResultRoutingModule } from './search-result-routing.module';
import { SearchResultComponent } from './search-result.component';
import { AppShareModule } from 'src/app/share/app-share/app-share.module';
import { SrMainTypePickerComponent } from './widgets/sr-main-type-picker/sr-main-type-picker.component';
import { SrSubTypePickerComponent } from './widgets/sr-sub-type-picker/sr-sub-type-picker.component';
import { SrListPostComponent } from './widgets/sr-list-post/sr-list-post.component';
import { SrListCommentComponent } from './widgets/sr-list-comment/sr-list-comment.component';
import { SrItemPostComponent } from './widgets/sr-item-post/sr-item-post.component';
import { SrItemCommentComponent } from './widgets/sr-item-comment/sr-item-comment.component';


@NgModule({
  declarations: [
    SearchResultComponent,
    SrMainTypePickerComponent,
    SrSubTypePickerComponent,
    SrListPostComponent,
    SrListCommentComponent,
    SrItemPostComponent,
    SrItemCommentComponent
  ],
  imports: [
    CommonModule,
    SearchResultRoutingModule,
    AppShareModule,
  ]
})
export class SearchResultModule { }
