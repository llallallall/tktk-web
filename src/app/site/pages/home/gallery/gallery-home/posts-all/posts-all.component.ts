import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/service/api.service';
import { fadeIn } from 'src/app/share/animations/fade-in.animation';
import * as _ from 'lodash';
import QueryParams from 'src/app/models/params/query.params';
import { UserModel } from 'src/app/models/users/user-model';
import { PageEvent } from '@angular/material/paginator';
import { ColumnHeader } from 'src/app/models/ui/column-header';
import { PostModel } from 'src/app/models/posts/post.model';
import { CategoryService } from 'src/app/service/category.service';
import { Cd } from 'src/app/models/codes/cd';
import { UsersService } from 'src/app/service/users.service';
import { NoticeParam } from 'src/app/models/cs/notice.param';
import { NoticeModel } from 'src/app/models/cs/notice.model';
import { PostService } from 'src/app/service/post.service';


@Component({
  selector: 'app-posts-all',
  templateUrl: './posts-all.component.html',
  animations: [fadeIn,],
})
export class PostsAllComponent implements OnInit {

  isLoading = false;
  qp = new QueryParams();
  items: PostModel[] = [];
  itemsNotice: NoticeModel[] = [];

  columns = [
    new ColumnHeader('custId', '게시글 제목'),
    new ColumnHeader('name', '카테고리'),
    new ColumnHeader('name', '갤러리'),
    new ColumnHeader('name', '노출'),
    new ColumnHeader('name', '조회'),
    // new ColumnHeader('lasAccessTs', '최근 로그인 시간', ColumnHeader.Sort.desc),
    // new ColumnHeader('createdTs', '계정 생성일자', ColumnHeader.Sort.none),
  ];

  constructor(
    private _api: ApiService,
    private _posts: PostService,
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
      this.qp = new QueryParams(q);
      this.qp.set('display', Cd.YN.Y);
      if (!querys.mediaType) {
        this.qp.set('mediaType', Cd.All);
      }
      // console.log(ftag, 'pageParams=', this.pageParams.getAttrs());
      // console.log(ftag, 'searchWord=', this.pageParams.get('searchWord'));
      this.loadItems();
    });
  }

  routeThis() {
    const path = this._api.config.currentUrl;
    this._api.config.router.navigate([path], {
      queryParams: this.qp.getAttrs(),
      replaceUrl: true,
    });
  }

  get me(): UserModel {
    return this._api.me;
  }


  async loadItems() {
    const ftag = `loadItems(),`;
    try {

      await this.loadNotice();
      this.isLoading = true;

      // await this._api.reqGetMeIfNeed();

      this.qp.pageSize = 10;
      // this.qp.set('siteIdx', this._api.siteIdx);
      const res: any = await this._api.reqPostCmd('post_list', {
        queryParams: this.qp.getAttrs(),
      });
      console.log(ftag, 'res=', res);
      this.isLoading = false;
      if (res.result) {
        this.qp = new QueryParams(res.queryParams);
        this.items = [];
        for (const item of res.result) {
          const m = new PostModel(item);
          m.categoryModel = await this._category.loadCategoryIfNeed(m.categoryIdx);
          m.galleryModel = await this._category.loadGalleryIfNeed(m.galleryIdx);
          m.userCreator = await this._users.user_get_ifNeed(m.creatorIdx);
          this.items.push(m);
          this._posts.loadEvalData(m);
        }
      }
      // console.log(ftag, 'items=', this.items);
    } catch (err) {
      this.isLoading = false;
      console.log(ftag, 'err=', err);
    }
  }

  async loadNotice() {
    const ftag = `loadNotice(),`;
    try {
      // await this._api.reqGetMeIfNeed();

      // this.qp.pageSize = 10;
      // this.qp.set('siteIdx', this._api.siteIdx);
      const qp = new NoticeParam();
      qp.noticeLocation = Cd.NoticeLocation.gallery;
      qp.galleryIdx = this.qp.get('galleryIdx');
      qp.pageSize = 5;
      const res: any = await this._api.reqNoticeCmd('notice_list', qp.qpBody);
      console.log(ftag, 'res=', res);
      this.isLoading = false;
      if (res.result) {
        this.itemsNotice = [];
        for (const item of res.result) {
          const m = new NoticeModel(item);
          this.itemsNotice.push(m);
          this._posts.loadEvalData(m);
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
    this.routeThis();
  }

  onClickAdd() {
    this._api.navigate('/p/h/posts/add');
  }

  onClickItem(item: PostModel) {
    if (item.postType === Cd.PostType.notice) {
      this._api.navigate('/p/h/notice/detail', {
        queryParams: {
          objectId: item.objectId,
        }
      });
      return;
    }
    this._api.navigate('/p/h/posts/detail', {
      queryParams: {
        objectId: item.objectId,
      }
    });
  }

  on_changed_mediaType($event) {
    const ftag = `on_changed_mediaType(),`;
    console.log(ftag, '$event=', $event);
    this.qp.set('mediaType', $event);
    this.routeThis();
  }

  get mediaType(): string {
    return this.qp.get('mediaType') || Cd.All;
  }

  on_click_edit($event) {
    const ftag = `on_click_edit(),`;
    console.log(ftag,);
    this._api.navigate('/p/h/posts/add', {
      queryParams: {
        galleryIdx: this.qp.get('galleryIdx'),
      }
    });
  }


}
