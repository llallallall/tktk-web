import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { SiteModel } from "../models/site/site.model";
import { ApiService } from "../service/api.service";
import { fadeIn } from "../share/animations/fade-in.animation";

@Component({
  selector: "app-site",
  templateUrl: "./site.component.html",
  animations: [fadeIn],
})
export class SiteComponent implements OnInit {
  isLoading = false;

  constructor(private _api: ApiService, private _aRoute: ActivatedRoute) {}

  ngOnInit(): void {
    // this.parseParams();
    const ftag = `ngOnInit(),`;
    const routeParams = this._aRoute.snapshot.paramMap;
    const siteId = routeParams.get("siteId");
    console.log(ftag, "siteId=", siteId);
    if (siteId) {
      this.loadSiteIfNeed(siteId);
    } else {
      this._api.config.gotoSiteList();
    }
  }
 
  // get siteModel(): SiteModel {
  //   return this._api.config.siteModel;
  // }
  // 사이트를 들어가기 위해 강제로 입력
  get siteModel() {
    return {};
  }

  async loadSiteIfNeed(siteId: string) {
    const ftag = `(loadSiteIfNeed(${siteId})),`;
    try {
      // console.log(ftag, 'siteModel=', this._api.siteModel);
      if (this._api.config.siteModel?.siteId === siteId) {
        return;
      }
      this._api.config.siteModel = null;
      this.isLoading = true;
      const error = await this._api.reqGetSite(siteId);
      this.isLoading = false;
      if (this._api.siteModel) {
        return;
      }
      this._api.config.gotoSiteList();
      // const res = await this._api.reqSiteCmd('site_by_siteId', {
      //   siteId: siteId,
      // });

      // // console.log(ftag, 'res=', res);
      // if (res.result) {
      //   this._api.config.siteModel = new SiteModel(res.result);
      //   console.log(ftag, 'siteId=', this._api.siteId);
      // } else {
      //   this._api.config.gotoSiteList();
      // }
    } catch (err) {
      this.isLoading = false;
      console.log(ftag, "err=", err);
    }
  }
}
