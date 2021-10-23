import { Component, OnInit } from '@angular/core';
import * as _ from 'lodash';
import { SiteModel } from 'src/app/models/site/site.model';
import { StyleDef } from 'src/app/models/theme/style-def';
import { StyleItem } from 'src/app/models/theme/style-item';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-uidz-colors',
  templateUrl: './uidz-colors.component.html',
  styleUrls: ['./uidz-colors.component.scss',],
  styles: [
  ]
})
export class UidzColorsComponent implements OnInit {

  colorMap: Map<string, string> = new Map();

  constructor(
    private _api: ApiService,
  ) { }

  ngOnInit(): void {
    this.bldColorMap();
  }

  bldColorMap() {
    for (const item of this.items) {
      this.colorMap.set(item.name, item.value);
    }
  }



  get uiType(): string {
    return this._api.siteModel.uiType;
  }

  get items(): StyleItem[] {
    return StyleDef.getItems(this.uiType);
  }

  on_changed_uiType($event: string) {
    this._api.siteModel.uiType = $event;
    this._api.updateTheme();
    this.bldColorMap();
  }

  on_changed_color($event) {
    const ftag = `on_changed_color(),`;
    console.log(ftag, '$event=', $event);
    this._api.updateTheme();
    this.bldColorMap();
  }





}
