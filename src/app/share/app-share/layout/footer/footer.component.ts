import { Component, OnInit } from '@angular/core';
import { SiteSettingModel } from 'src/app/models/site/site-setting.model';
import { SiteModel } from 'src/app/models/site/site.model';
import { ApiService } from 'src/app/service/api.service';
import { fadeIn } from 'src/app/share/animations/fade-in.animation';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss',],
  animations: [fadeIn,],
})
export class FooterComponent implements OnInit {

  constructor(
    private _api: ApiService,
  ) { }

  ngOnInit(): void {
    const ftag = `ngOnInit(),`;
    // console.log(ftag, 'siteModel=', this._api.siteModel);
    // console.log(ftag, 'logoUrl=', this.logoUrl);
  }

  get siteModel(): SiteModel {
    return this._api.siteModel;
  }

  get siteSettingModel(): SiteSettingModel {
    return this.siteModel.siteSettingModel;
  }

  get logoUrl(): string {
    return this.siteModel.logoUrl;
  }

  onClickNotice() {
    const ftag = `onClickNotice(),`;
    this._api.navigate(`/p/h/notice`);
  }

  onClickOto() {
    const ftag = `onClickOto(),`;
    this._api.navigate(`/p/h/oto`);
  }


}
