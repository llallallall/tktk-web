import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OtoDetailComponent } from './oto-detail.component';

const routes: Routes = [
  { path: '', component: OtoDetailComponent, },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OtoDetailRoutingModule { }
