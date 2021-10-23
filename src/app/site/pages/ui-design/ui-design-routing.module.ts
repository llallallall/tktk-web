import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'colors',
    pathMatch: 'full'
  },
  {
    path: 'colors',
    loadChildren: () => import('./uidz-colors/uidz-colors.module')
      .then(m => m.UidzColorsModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UiDesignRoutingModule { }
