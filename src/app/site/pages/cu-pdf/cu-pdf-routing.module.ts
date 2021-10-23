import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CuPdfComponent } from './cu-pdf.component';

const routes: Routes = [
  { path: '', component: CuPdfComponent, },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CuPdfRoutingModule { }
