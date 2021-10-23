import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GalleryNoticeComponent } from './gallery-notice.component';

const routes: Routes = [
  { path: '', component: GalleryNoticeComponent, },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GalleryNoticeRoutingModule { }
