import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavercbComponent } from './navercb.component';

const routes: Routes = [
  { path: '', component: NavercbComponent, },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NavercbRoutingModule { }
