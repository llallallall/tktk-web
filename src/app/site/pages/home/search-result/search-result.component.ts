import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/service/api.service';
import { fadeIn } from 'src/app/share/animations/fade-in.animation';
import * as _ from 'lodash';
import { PostModel } from 'src/app/models/posts/post.model';
import { CategoryService } from 'src/app/service/category.service';
import { UsersService } from 'src/app/service/users.service';
import DlgUtil from 'src/app/utils/dlg.util';
import { PostParam } from 'src/app/models/posts/post.param';
import { Cd } from 'src/app/models/codes/cd';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.scss',],
  animations: [fadeIn,],
})
export class SearchResultComponent implements OnInit {

  isLoading = false;
  qp: PostParam = new PostParam();
  items: PostModel[] = [];


  constructor(
    private _api: ApiService,
    private _category: CategoryService,
    private _users: UsersService,
    private _aRoute: ActivatedRoute,
    private _dlg: MatDialog,
  ) { }

  ngOnInit(): void {
    // this._pApi.items = null;  
    this.parseParams();
  }

  parseParams() {
    const ftag = `parseParams()`;
    this._aRoute.queryParams.subscribe((querys) => {
      // console.log(ftag, 'querys=', querys);
      const q = _.clone(querys);
      this.qp = new PostParam(q);
      this.qp.sr_main = this.qp.sr_main || PostParam.SrMain.integrated;
      this.qp.searchKey = this.qp.searchKey || PostParam.SrSub.tc;
      // console.log(ftag, 'pageParams=', this.pageParams.getAttrs());
      // console.log(ftag, 'searchWord=', this.pageParams.get('searchWord'));
      this.loadModel();
    });
  }

  async loadModel() {
    const ftag = `loadItems(),`;
    try {
      this.isLoading = true;

      // this.qp.searchKey = 'title+content';
      // console.log(ftag, 'qp=', this.qp.getAttrs());
      this.qp.display = Cd.YN.Y;
      console.log(ftag, 'qp=', this.qp.getAttrs());
      const res: any = await this._api.reqPostCmd('post_list', {
        queryParams: this.qp.getAttrs(),
      });
      console.log(ftag, 'res=', res);
      this.isLoading = false;
      if (res.error) {
        DlgUtil.showErrIfMsg(this._dlg, res.error);
        return;
      }
      if (res.result) {
        this.qp = new PostParam(res.queryParams);
        this.items = [];
        for (const item of res.result) {
          const m = new PostModel(item);
          this.items.push(m);
        }
      }
      // console.log(ftag, 'items=', this.items);
    } catch (err) {
      this.isLoading = false;
      console.log(ftag, 'err=', err);
    }
  }

  onClickSearch() {
    if (!this.qp.searchWord) {
      return;
    }
    this._api.routeThis(this.qp);
  }

  on_changed_sr_main($event) {
    this.qp.sr_main = $event;
    this._api.routeThis(this.qp);
  }

  on_changedQp($event: PostParam) {
    this.qp = $event;
    this._api.routeThis(this.qp);
  }





}
