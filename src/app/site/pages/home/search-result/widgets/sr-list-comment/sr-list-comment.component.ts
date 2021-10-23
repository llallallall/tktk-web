import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostParam } from 'src/app/models/posts/post.param';
import { ApiService } from 'src/app/service/api.service';
import { fadeIn } from 'src/app/share/animations/fade-in.animation';
import * as _ from 'lodash';
import { PostModel } from 'src/app/models/posts/post.model';
import { CategoryService } from 'src/app/service/category.service';
import { UsersService } from 'src/app/service/users.service';
import { CommentParam } from 'src/app/models/posts/comment.param';
import { CommentModel } from 'src/app/models/posts/comment.model';
import { PageEvent } from '@angular/material/paginator';
import { PostService } from 'src/app/service/post.service';
import { Cd } from 'src/app/models/codes/cd';


@Component({
  selector: 'app-sr-list-comment',
  templateUrl: './sr-list-comment.component.html',
  styleUrls: ['../../search-result.component.scss',],
  animations: [fadeIn,],
})
export class SrListCommentComponent implements OnInit {

  @Input() qp: CommentParam;
  @Output() on_changed_qp = new EventEmitter();
  isLoading = false;
  items: CommentModel[] = [];

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
      this.qp = new CommentParam(q);
      this.qp.initQp();
      this.qp.contentType = CommentModel.Type.post;
      this.qp.display = this.qp.display || Cd.YN.Y;
      // this.qp.sr_main = this.qp.sr_main || PostParam.SrMain.integrated;
      // this.qp.searchKey = this.qp.searchKey || PostParam.SrSub.tc;
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

  async loadItems() {
    const ftag = `loadItems(),`;
    try {
      this.isLoading = true;

      // await this._api.reqGetMeIfNeed();

      this.qp.pageSize = this.qp.pageSize || 30;
      // this.qp.set('siteIdx', this._api.siteIdx);
      this.qp.display = Cd.YN.Y;
      const res: any = await this._api.reqCommentCmd('comment_list', {
        queryParams: this.qp.getAttrs(),
      });
      console.log(ftag, 'res=', res);
      this.isLoading = false;
      if (res.result) {
        this.qp = new CommentParam(res.queryParams);
        this.items = [];
        for (const item of res.result) {
          const m = new CommentModel(item);
          // m.categoryModel = await this._category.loadCategoryIfNeed(m.categoryIdx);
          // m.galleryModel = await this._category.loadGalleryIfNeed(m.galleryIdx);
          m.userCreator = await this._users.user_get_ifNeed(m.creatorIdx);
          m.postModel = await this._post.loadItemIfNeed(m.contentIdx);
          this.items.push(m);
        }
      }
      // console.log(ftag, 'items=', this.items);
    } catch (err) {
      this.isLoading = false;
      console.log(ftag, 'err=', err);
    }
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
      this.qp.sr_main = PostParam.SrMain.comment;
    }
    this._api.routeThis(this.qp);
  }
}
