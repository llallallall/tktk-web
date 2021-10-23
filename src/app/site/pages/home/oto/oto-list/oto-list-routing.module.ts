import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OtoListComponent } from './oto-list.component';

const routes: Routes = [
  { path: '', component: OtoListComponent, },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OtoListRoutingModule { }
