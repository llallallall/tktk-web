import { Injectable } from '@angular/core';
import * as _ from 'lodash';
import { MainMenulModel } from '../models/menus/main-menu.model';
import QueryParams from '../models/params/query.params';
import { DepartModel } from '../models/users/depart.model';
import { UserModel } from '../models/users/user-model';
import { ApiService } from './api.service';
import { DepartService } from './depart.service';


@Injectable({
  providedIn: 'root'
})
export class UsersService {


  constructor(
    public _depart: DepartService,
  ) {
    // }
    // console.log('ftag', 'menus=', this.menus);
  }

  get _api(): ApiService {
    return this._depart._api;
  }


  async user_get_ifNeed(userIdx: string): Promise<UserModel> {
    const ftag = `user_get_ifNeed(${userIdx}),`;
    try {
      const model = this._api._store.getUserModel(userIdx);
      if (model) {
        return model;
      }
      return await this.user_get(userIdx);
    } catch (err) {
      console.log(ftag, 'err=', err);
    }
  }

  async user_get(userIdx: string): Promise<UserModel> {
    const ftag = `user_get(${userIdx}),`;
    try {
      await this._depart.loadItemsIfNeed();
      const res = await this._api.reqUsersCmd('user_get', {
        userIdx: userIdx,
      });
      // console.log(ftag, 'res=', res);
      if (res.result) {
        const m = new UserModel(res.result);
        if (m.departIdx) {
          m.departModel = this._depart.itemMap.get(m.departIdx);
        }
        this._api._store.setUserModel(m);
        return m;
      }
    } catch (err) {
      console.log(ftag, 'err=', err);
    }
  }


} // end of class
