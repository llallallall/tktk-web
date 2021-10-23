import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styles: [
  ]
})
export class PagesComponent implements OnInit {

  constructor(
    private _api: ApiService,
    private _aRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    // this.parseParams();
    const ftag = `ngOnInit(),`;   
    // const routeParams = this._aRoute.snapshot.paramMap;
    // this._api.config.siteId = routeParams.get('siteId');
    // console.log(ftag, 'siteId=', this._api.config.siteId);
  }

  // parseParams() {
  //   const ftag = `parseParams()`;
  //   this._aRoute.queryParams.subscribe((querys) => {
  //     if (querys.userIdx) {
  //       this._pos.reqPoUser(querys.userIdx);
  //       // this.loadItem(querys.userIdx);
  //     }
  //   });
  // }

}
