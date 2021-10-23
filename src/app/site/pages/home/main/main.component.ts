import { Component, OnInit } from '@angular/core';
import { CategoryModel } from 'src/app/models/communities/category.model';
import QueryParams from 'src/app/models/params/query.params';
import { SiteModel } from 'src/app/models/site/site.model';
import { CategoryService } from 'src/app/service/category.service';
import { fadeIn } from 'src/app/share/animations/fade-in.animation';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  animations: [fadeIn,],
})
export class MainComponent implements OnInit {

  isLoading = false;
  searchMode = false;
  qp = new QueryParams();

  constructor(
    private _category: CategoryService,
  ) { }

  ngOnInit(): void {
    this.loadCategories();
  }

  async loadCategories() {
    const ftag = `loadCategories(),`;
    try {
      this.isLoading = true;
      await this._category.loadItemsIfNeed();
      this.isLoading = false;
      console.log(ftag, 'items=', this._category.items);
    } catch (err) {
      this.isLoading = false;
      console.log(ftag, 'err=', err);
    }
  }

  get itemsCategory(): CategoryModel[] {
    return this._category.items;
  }

  get siteModel(): SiteModel {
    return this._category._api.siteModel;
  }

  onClickCategory(item: CategoryModel) {

  }

  onClickSearch() {
    if (!this.qp.searchWord) {
      return;
    }
    this._category._api.navigate('/p/h/search', {
      queryParams: this.qp.getAttrs()
    });
  }

}
