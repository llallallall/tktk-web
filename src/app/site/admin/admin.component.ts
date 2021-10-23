import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/service/api.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styles: [
  ]
})
export class AdminComponent implements OnInit {

  constructor(
    private _api: ApiService,
    private _aRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    // this.parseParams();
    const ftag = `ngOnInit(),`;
    const routeParams = this._aRoute.snapshot.paramMap;
    // console.log(ftag, 'snapshot=', this._aRoute.snapshot);
    // this._api.config.siteId = routeParams.get('siteId');    
    // console.log(ftag, 'siteId=', this._api.config.siteId);
    // const siteId = routeParams.get('siteId');
    // console.log(ftag, 'siteId=', this._api.config.siteId);
    if (this._api.config.siteModel) {
      const href = `${environment.admUrl}/${this._api.config.siteModel.siteId}`;
      console.log(ftag, 'href=', href);
      window.location.href = `${environment.admUrl}/${this._api.config.siteModel.siteId}`;
    }

  }


}
