import { Injectable } from '@angular/core';
import * as _ from 'lodash';
import { MainMenulModel } from '../models/menus/main-menu.model';
import QueryParams from '../models/params/query.params';
import { DepartModel } from '../models/users/depart.model';
import { ApiService } from './api.service';


@Injectable({
  providedIn: 'root'
})
export class DepartService {

  itemMap: Map<string, DepartModel> = new Map();

  constructor(
    public _api: ApiService,
  ) {
    // }
    // console.log('ftag', 'menus=', this.menus);
  }

  get items(): DepartModel[] {
    const ftag = `items(),`;
    if (this.itemMap.size > 0) {
      // console.log(ftag, 'values=', this.itemMap.values());
      const arr = Array.from(this.itemMap.values());
      // console.log(ftag, 'arr=', arr);
      return arr;
    }
    return []
  }
  
  async loadItemsIfNeed() {
    const ftag = `loadItemsIfNeed(),`;
    try {
      if (this.itemMap.size > 0) {
        return;
      }
      await this.loadItems();
    } catch (err) {
      console.log(ftag, 'err=', err);
    }
  }

  async loadItems() {
    const ftag = `loadItems(),`;
    try {
      const qp = new QueryParams();
      qp.pageSize = 1000;
      const res = await this._api.reqDepartCmd('depart_list', {
        queryParams: qp.getAttrs(),
      });
      // console.log(ftag, 'res=', res);
      if (res.result) {
        this.itemMap.clear();
        for (const item of res.result) {
          const m = new DepartModel(item);
          this.itemMap.set(m.objectId, m);
        }
      }
    } catch (err) {
      console.log(ftag, 'err=', err);
    }
  }

  async depart_create(model: DepartModel) {
    const ftag = `depart_create(${model.name}),`;
    try {
      model.siteIdx = this._api.siteIdx;
      const res = await this._api.reqDepartCmd('depart_create', model.getAttrs());
      // console.log(ftag, 'res=', res);
      if (res.result) {
        const m = new DepartModel(res.result);
        this.itemMap.set(m.objectId, m);
      }
    } catch (err) {
      console.log(ftag, 'err=', err);
      throw err;
    }
  }

  async depart_update(model: DepartModel) {
    const ftag = `depart_update(${model.name}),`;
    try {
      model.siteIdx = this._api.siteIdx;
      const res = await this._api.reqDepartCmd('depart_update', model.getAttrs());
      // console.log(ftag, 'res=', res);
      if (res.result) {
        const m = new DepartModel(res.result);
        this.itemMap.set(m.objectId, m);
      }
    } catch (err) {
      console.log(ftag, 'err=', err);
      throw err;
    }
  }


} // end of class
