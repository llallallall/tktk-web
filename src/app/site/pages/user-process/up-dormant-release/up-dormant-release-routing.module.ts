import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UpDormantReleaseComponent } from './up-dormant-release.component';

const routes: Routes = [
  { path: '', component: UpDormantReleaseComponent, },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UpDormantReleaseRoutingModule { }
