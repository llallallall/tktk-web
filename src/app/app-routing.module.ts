import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

const routes: Routes = [
  {
    path: "",
    // 기본 경로 route 변경
    redirectTo: "theenm/p/i",
    pathMatch: "full",
  },
  {
    path: "site-list",
    loadChildren: () =>
      import("./site-list/site-list.module").then((m) => m.SiteListModule),
  },
  {
    path: ":siteId",
    loadChildren: () => import("./site/site.module").then((m) => m.SiteModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
