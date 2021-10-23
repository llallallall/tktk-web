import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CuPdfRoutingModule } from './cu-pdf-routing.module';
import { CuPdfComponent } from './cu-pdf.component';
import { AppShareModule } from 'src/app/share/app-share/app-share.module';
import { PdfViewerModule } from 'ng2-pdf-viewer';

@NgModule({
  declarations: [
    CuPdfComponent
  ],
  imports: [
    CommonModule,
    CuPdfRoutingModule,
    AppShareModule,
    PdfViewerModule,
  ]
})
export class CuPdfModule { }
