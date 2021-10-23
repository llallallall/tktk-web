import { Injectable } from '@angular/core';
import * as _ from 'lodash';
import { MainMenulModel } from '../models/menus/main-menu.model';
import { ApiService } from './api.service';


@Injectable({
  providedIn: 'root'
})
export class MenuService {

  menus: MainMenulModel[] = MainMenulModel.defaultMenus;
  public currentMenu: MainMenulModel;

  constructor(
    private _api: ApiService,
  ) {
    // }
    // console.log('ftag', 'menus=', this.menus);
  }

  onNavigationEnd(path: string) {
    const ftag = `onNavigationEnd(${path}),`;
    // console.log(ftag, 'path=', path);
    const spath = path.replace(`/${this._api.siteId}`, '');
    const m = this.findMenu(spath);
    // console.log(ftag, 'id=', m?.id);
    if (m) {
      this.setCurrentMenu(m);
    } else {
      if (this.currentMenu) {
        this.currentMenu.selected = false;
        this.currentMenu = null;
      }
    }
  }

  findMenu(pathUrl: string): MainMenulModel {
    const ftag = `findMenu(${pathUrl}),`;
    for (const menu of this.menus) {
      // console.log(ftag, 'path=', menu.path);
      const m = menu.findMenu(pathUrl) as MainMenulModel;
      if (m) {
        return m;
      }
    }
  }


  setCurrentMenu(item: MainMenulModel) {
    const ftag = `setCurrentMenu(${item.id}),`;
    // console.log(ftag, 'currentMenu=', this.currentMenu)

    if (this.currentMenu) {
      if (this.currentMenu === item || this.currentMenu.id === item.id) {
        return;
      }
      this.currentMenu.selected = false;
      item.selected = true;
      this.currentMenu = item;
      // console.log(ftag, 'currentMenu=', this.currentMenu);
    } else {
      for (const menu of this.menus) {
        menu.selected = false;
      }
      item.selected = true;
      this.currentMenu = item;
      // console.log(ftag, 'menus=', this.menus);
    }
    // console.log(ftag, 'currentMenu=', this.currentMenu);
    if (this.currentMenu.parent) {
      this.currentMenu.parent.expanded = true;
    }
  }
} // end of class
