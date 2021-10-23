import { Component, OnInit } from '@angular/core';
import { SiteModel } from 'src/app/models/site/site.model';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-under-dev',
  templateUrl: './under-dev.component.html',
  styleUrls: ['./under-dev.component.scss',],
})
export class UnderDevComponent implements OnInit {

  constructor(
    private _api: ApiService,
  ) { }

  ngOnInit(): void {
    const ftag = `ngOnInit(),`;
    console.log(ftag, 'siteModel=', this.siteModel);   
  }

  get siteModel(): SiteModel {
    return this._api.siteModel;
  }


}
