import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UnderDevComponent } from './under-dev.component';

const routes: Routes = [
  { path: '', component: UnderDevComponent, },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UnderDevRoutingModule { }
