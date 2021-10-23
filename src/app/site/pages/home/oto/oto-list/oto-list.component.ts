import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/service/api.service';
import { fadeIn } from 'src/app/share/animations/fade-in.animation';
import * as _ from 'lodash';
import { CategoryService } from 'src/app/service/category.service';
import { UsersService } from 'src/app/service/users.service';
import DlgUtil from 'src/app/utils/dlg.util';
import { OtoqParam } from 'src/app/models/cs/otoq.param';
import { OtoqModel } from 'src/app/models/cs/otoq.model';
import { PageEvent } from '@angular/material/paginator';
import { QnaPasswdDlgComponent } from './qna-passwd-dlg/qna-passwd-dlg.component';
import { Cd } from 'src/app/models/codes/cd';

// https://tktk.crazyupinc.com/theenm/p/pdf?pageNo=90


@Component({
  selector: 'app-oto-list',
  templateUrl: './oto-list.component.html',
  styleUrls: ['./oto-list.component.scss',],
  animations: [fadeIn,],
})
export class OtoListComponent implements OnInit {

  isLoading = false;
  qp: OtoqParam = new OtoqParam();
  items: OtoqModel[] = [];


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
      this.qp = new OtoqParam(q);
      // console.log(ftag, 'pageParams=', this.pageParams.getAttrs());
      // console.log(ftag, 'searchWord=', this.pageParams.get('searchWord'));
      this.loadModel();
    });
  }

  async loadModel() {
    const ftag = `loadItems(),`;
    try {
      this.isLoading = true;

      await this._api.reqGetMeIfNeed();
      console.log(ftag, 'me=', this._api.me);

      // this.qp.searchKey = 'title+content';
      // console.log(ftag, 'qp=', this.qp.getAttrs());
      const res: any = await this._api.reqQnaCmd('qna_list', {
        queryParams: this.qp.getAttrs(),
      });
      // console.log(ftag, 'res=', res);
      this.isLoading = false;
      if (res.error) {
        DlgUtil.showErrIfMsg(this._dlg, res.error);
        return;
      }
      if (res.result) {
        this.qp = new OtoqParam(res.queryParams);
        this.items = [];
        for (const item of res.result) {
          const m = new OtoqModel(item);
          m.userCreator = await this._users.user_get_ifNeed(m.creatorIdx);
          this.items.push(m);
        }
      }

      if (!this._api.me) {
        const ref = DlgUtil.showConfirm(this._dlg, {
          title: `로그인 상태에서 가능한 기능입니다. \n로그인 하시겠습니까?`,
          okBtnColor: 'primary',
          showCancel: Cd.YN.Y,
        });
        ref.afterClosed().subscribe(result => {
          // console.log(ftag, 'result=', result);
          if (result) {
            this._api.config.gotoLogin();
          } else {
            this._api.goBack();
          }
        });
      }

      // DlgUtil.confirmLogin(this._api, this._dlg);
      // if (!this._api.me) {
      //   DlgUtil.showConfirm()
      // }
      // if (this._api.config.tokenInfo)
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

  on_changed_filter($event) {
    const ftag = `on_changed_filter(),`;
    // console.log(ftag, 'qp=', this.qp.getAttrs());
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
    this._api.routeThis(this.qp);
  }


  onClickAdd() {
    this._api.navigate('/p/h/oto/add');
  }

  onClickItem(item: OtoqModel) {
    const ftag = `onClickItem(),`;
    const ref = this._dlg.open(QnaPasswdDlgComponent, {
      width: '300px',
      data: {
        model: item,
      },
      autoFocus: false,
    });
    ref.afterClosed().subscribe(result => {
      console.log(ftag, 'result=', result);
      if (result) {
        this.on_passwd_checked(result);
      }
    })
  }

  on_passwd_checked(res: any) {
    if (res.error) {
      DlgUtil.showIfErrMsg(this._dlg, res);
      return;
    }
    if (res.result) {
      this._api.navigate('/p/h/oto/detail', {
        queryParams: res.result,
      });
    }

  }


}
