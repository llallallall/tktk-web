import { Component, NgZone, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SiteModel } from 'src/app/models/site/site.model';
import { UserModel } from 'src/app/models/users/user-model';
import { ApiService } from 'src/app/service/api.service';
import { fadeIn } from 'src/app/share/animations/fade-in.animation';
import DlgUtil from 'src/app/utils/dlg.util';
import * as _ from 'lodash';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

// https://www.figma.com/file/5McWa4BMFFXRDM4qfsklr4/tikitaka-user?node-id=222%3A11434

function _window(): any {
  return window;
}

@Component({
  selector: 'app-my-info',
  templateUrl: './my-info.component.html',
  animations: [fadeIn,],
})
export class MyInfoComponent implements OnInit {

  isLoading = false;
  userModel: UserModel;

  constructor(
    private _api: ApiService,
    private _sb: MatSnackBar,
    private _dlg: MatDialog,
    private _ngZone: NgZone,
  ) { }

  ngOnInit(): void {
    const ftag = `ngOnInit(),`;
    // console.log(ftag, 'siteModel=', this.siteModel);
    this.loadModel();

    var IMP = _window().IMP;
    // console.log(ftag, 'IMP=', IMP);
    IMP.init(environment.importId);
    console.log(ftag, 'IMP=', IMP);
  }

  get siteModel(): SiteModel {
    return this._api.siteModel;
  }

  async loadModel() {
    const ftag = `loadModel(),`;
    try {
      this.isLoading = true;
      await this._api.reqGetMeIfNeed();
      this.isLoading = false;
      this.userModel = new UserModel(_.clone(this._api.me.getAttrs()))
      console.log(ftag, 'userModel=', this.userModel);
    } catch (err) {
      this.isLoading = false;
      console.log(ftag, 'err=', err);
    }
  }

  onClickEdit() {
    this._api.navigate('/p/h/me/edit');
  }

  onClickWithdrawn() {
    // http://localhost:1290/theenm/p/pdf?title=%EB%82%B4%EC%A0%95%EB%B3%B4%20page&pageNo=70
    this._api.navigate('/p/h/me/wd');
  }

  onClickLogout() {
    const ftag = `onClickLogout(),`;

    const ref = DlgUtil.showConfirm(this._dlg, {
      title: `로그아웃 하시겠습니까?`,
      okBtnColor: 'primary',
      okBtnName: '로그아웃'
    });
    ref.afterClosed().subscribe(result => {
      // console.log(ftag, 'result=', result);
      if (result) {
        this._api.config.tokenInfo = null;
        this._api.config.removeItem('tokenInfo'); //  = null;
        this._api.me = null;
        console.log(ftag, 'tokenInfo=', this._api.config.tokenInfo);
        this._api.navigate(`/p/h`);
      }
    });
  }

  // const {IMP} = window;

  onClickVerify(type: string) {
    const ftag = `onClickVerify(${type}),`;

    // const merchant_uid = this.userModel.objectId;
    // const data: Record<string, any> = {
    //   merchant_uid: this.userModel.objectId,
    //   name: undefined,
    //   phone: undefined,
    //   min_age: undefined
    // };

    var IMP = _window().IMP;
    IMP.certification({
      name: undefined,
      phone: undefined,
      merchant_uid: this.userModel.objectId,
      popup: true,
    }, this.onResult.bind(this));
    console.log(ftag, 'IMP=', IMP);

  }

  async onResult(rsp: any) {
    const ftag = `(),`;
    console.log(ftag, 'rsp=', rsp);
    if (rsp.success) {
      // 인증성공
      rsp.result = 'success';
      console.log(rsp.imp_uid);
      console.log(rsp.merchant_uid);
    } else {
      // 인증취소 또는 인증실패
      // var msg = '인증에 실패하였습니다.';
      // msg += '에러내용 : ' + rsp.error_msg;
      rsp.result = 'fail';
      // alert(msg);
    }
    // this.mobileService.callMobileFunc('certify_result', rsp);
  }


}
