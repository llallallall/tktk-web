import { Component, OnInit } from '@angular/core';
import { SiteModel } from 'src/app/models/site/site.model';
import { ApiService } from 'src/app/service/api.service';


@Component({
  selector: 'app-user-process',
  templateUrl: './user-process.component.html',
  styles: [
  ]
})
export class UserProcessComponent implements OnInit {

  constructor(
    private _api: ApiService,
  ) { }

  ngOnInit(): void {
  }


  get siteModel(): SiteModel {
    return this._api.siteModel;
  }

}
