import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WdConfirmComponent } from './wd-confirm.component';

const routes: Routes = [
  { path: '', component: WdConfirmComponent, },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WdConfirmRoutingModule { }
