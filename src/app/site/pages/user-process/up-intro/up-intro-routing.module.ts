import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UpIntroComponent } from './up-intro.component';

const routes: Routes = [
  { path: '', component: UpIntroComponent, },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UpIntroRoutingModule { }
