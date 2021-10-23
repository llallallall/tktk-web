import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DormantReleaseComponent } from './dormant-release.component';

const routes: Routes = [
  { path: '', component: DormantReleaseComponent, },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DormantReleaseRoutingModule { }
