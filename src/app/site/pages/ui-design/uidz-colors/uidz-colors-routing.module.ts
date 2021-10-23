import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UidzColorsComponent } from './uidz-colors.component';

const routes: Routes = [
  { path: '', component: UidzColorsComponent, },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UidzColorsRoutingModule { }
