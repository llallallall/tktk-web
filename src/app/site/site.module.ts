import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { SiteRoutingModule } from "./site-routing.module";
import { SiteComponent } from "./site.component";
import { AppShareModule } from "../share/app-share/app-share.module";
import { IntroModule } from "./pages/intro/intro.module";

@NgModule({
  declarations: [SiteComponent],
  imports: [IntroModule, CommonModule, SiteRoutingModule, AppShareModule],
})
export class SiteModule {}
