import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostParam } from 'src/app/models/posts/post.param';
import { ApiService } from 'src/app/service/api.service';
import { fadeIn } from 'src/app/share/animations/fade-in.animation';
import * as _ from 'lodash';
import { PostModel } from 'src/app/models/posts/post.model';
import { CategoryService } from 'src/app/service/category.service';
import { UsersService } from 'src/app/service/users.service';
import { PageEvent } from '@angular/material/paginator';
import { PostService } from 'src/app/service/post.service';
import { Cd } from 'src/app/models/codes/cd';

@Component({
  selector: 'app-sr-list-post',
  templateUrl: './sr-list-post.component.html',
  styleUrls: ['../../search-result.component.scss',],
  animations: [fadeIn,],
})
export class SrListPostComponent implements OnInit {

  @Input() qp: PostParam;
  @Output() on_changed_qp = new EventEmitter();
  isLoading = false;
  items: PostModel[] = [];

  constructor(
    private _api: ApiService,
    private _aRoute: ActivatedRoute,
    private _post: PostService,
    private _category: CategoryService,
    private _users: UsersService,
  ) { }

  ngOnInit(): void {
    // this.qpLocal = new PostParam(this.qp.getAttrs());
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
      this.qp.display = Cd.YN.Y;
      console.log(ftag, 'qp=', this.qp);
      // console.log(ftag, 'pageParams=', this.pageParams.getAttrs());
      // console.log(ftag, 'searchWord=', this.pageParams.get('searchWord'));
      this.loadItems();
    });
  }

  on_changed_sr_sub($event) {
    this.qp.searchKey = $event;
    this.qp.pageNo = 0;
    if (this.qp.sr_main === PostParam.SrMain.integrated) {
      this.qp.sr_main = PostParam.SrMain.post;
      // this._api.routeThis(this.qp);
      // return;
    }
    this._api.routeThis(this.qp);
  }

  onPageEvent(event: PageEvent) {
    const ftag = `onPageEvent(),`;
    if (this.isLoading) {
      return;
    }
    // console.log(ftag, 'event=', event);
    this.qp.pageSize = event.pageSize;
    this.qp.pageNo = event.pageIndex;
    if (this.qp.sr_main === PostParam.SrMain.integrated) {
      this.qp.sr_main = PostParam.SrMain.post;
    }
    this._api.routeThis(this.qp);
  }

  async loadItems() {
    const ftag = `loadItems(),`;
    try {
      this.isLoading = true;
      const res = await this._post.loadItems(this.qp);
      this.isLoading = false;
      console.log(ftag, 'res=', res);
      this.items = res.items;
      this.qp = res.qp;
      // console.log(ftag, 'items=', this.items);
    } catch (err) {
      this.isLoading = false;
      console.log(ftag, 'err=', err);
    }
  }

}
