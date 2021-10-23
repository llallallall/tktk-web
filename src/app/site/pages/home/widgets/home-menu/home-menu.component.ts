import { Component, OnInit } from '@angular/core';
import { CategoryModel } from 'src/app/models/communities/category.model';
import { MainMenulModel } from 'src/app/models/menus/main-menu.model';
import { UserModel } from 'src/app/models/users/user-model';
import { ApiService } from 'src/app/service/api.service';
import { CategoryService } from 'src/app/service/category.service';
import { MenuService } from 'src/app/service/menu.service';
import { fadeIn } from 'src/app/share/animations/fade-in.animation';

@Component({
  selector: 'app-home-menu',
  templateUrl: './home-menu.component.html',
  animations: [fadeIn,],
})
export class HomeMenuComponent implements OnInit {

  isLoading = false;

  constructor(
    private _api: ApiService,
    private _category: CategoryService,
    private menu: MenuService,
  ) { }

  ngOnInit(): void {
    this.loadCategories();
  }

  get me(): UserModel {
    return this._api.me;
  }

  async loadCategories() {
    const ftag = `loadCategories(),`;
    try {
      this.isLoading = true;
      await this._category.loadItemsIfNeed();
      this.isLoading = false;
      // console.log(ftag, 'items=', this._category.items);
    } catch (err) {
      this.isLoading = false;
      console.log(ftag, 'err=', err);
    }
  }

  get itemsCategory(): CategoryModel[] {
    return this._category.items;
  }

  // get menus(): MainMenulModel[] {
  //   return this.menu.menus;
  // }

  onClickPdf(pageNo: number) {
    this._api.navigate('/p/pdf', {
      queryParams: {
        pageNo: pageNo,
      }
    });
  }

  onClickNotice() {
    const ftag = `onClickNotice(),`;
    this._api.navigate('/p/h/notice');
  }

  onClickCenter() {
    const ftag = `onClickCenter(),`;
    this._api.navigate('/p/h/oto');
  }

  onClickLogout() {
    const ftag = `onClickLogout(),`;
  }

}
