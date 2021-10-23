import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OtoAddComponent } from './oto-add.component';

const routes: Routes = [
  { path: '', component: OtoAddComponent, },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OtoAddRoutingModule { }
