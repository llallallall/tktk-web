import { Component, OnInit } from '@angular/core';
import QueryParams from '../models/params/query.params';
import { SiteModel } from '../models/site/site.model';
import { ApiService } from '../service/api.service';
import { fadeIn } from '../share/animations/fade-in.animation';

@Component({
  selector: 'app-site-list',
  templateUrl: './site-list.component.html',
  animations: [fadeIn,],
})
export class SiteListComponent implements OnInit {

  isLoading = false;
  items: SiteModel[] = [];

  constructor(
    private _api: ApiService,
  ) { }

  ngOnInit(): void {
    this.loadItems();
  }

  async loadItems() {
    const ftag = `loadItems(),`;
    try {
      const qp = new QueryParams();
      qp.pageSize = 100;
      this.isLoading = true;
      const res: any = await this._api.reqSiteCmd('site_list', {
        queryParams: qp.getAttrs(),
      });
      console.log(ftag, 'res=', res);
      this.isLoading = false;
      if (res.result) {
        // this.qp = new QueryParams(res.queryParams);
        this.items = [];
        for (const item of res.result) {
          const m = new SiteModel(item);
          this.items.push(m);
        }
      }
      // console.log(ftag, 'items=', this.items);
    } catch (err) {
      this.isLoading = false;
      console.log(ftag, 'err=', err);
    }
  }

  onClickItem(item: SiteModel) {
    this._api.router.navigate([`/${item.siteId}`]);
  }

}
