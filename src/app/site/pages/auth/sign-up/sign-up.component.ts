import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { SiteSettingModel } from 'src/app/models/site/site-setting.model';
import { SiteModel } from 'src/app/models/site/site.model';
import { UserModel } from 'src/app/models/users/user-model';
import { ApiService } from 'src/app/service/api.service';
import { fadeIn } from 'src/app/share/animations/fade-in.animation';
import DlgUtil from 'src/app/utils/dlg.util';
import * as _ from 'lodash';

// https://www.figma.com/file/5McWa4BMFFXRDM4qfsklr4/tikitaka-user?node-id=135%3A3235

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  animations: [fadeIn,],
})
export class SignUpComponent implements OnInit {

  isLoading = false;
  userModel: UserModel;

  constructor(
    private _api: ApiService,
    private _aRoute: ActivatedRoute,
    private _sb: MatSnackBar,
    private _dlg: MatDialog,
  ) { }

  ngOnInit(): void {
    const ftag = `ngOnInit(),`;
    console.log(ftag, 'siteModel=', this.siteModel);
    this.parseParams();
  }

  parseParams() {
    const ftag = `parseParams()`;
    this._aRoute.queryParams.subscribe((querys) => {
      console.log(ftag, 'querys=', querys);
      this.userModel = new UserModel(_.clone(querys));
      this.userModel.authType = this.userModel.authType || UserModel.Auth.id;
      console.log(ftag, 'userModel=', this.userModel);
      console.log(ftag, 'isSns=', this.isSns);
      // querys.title = querys.title || 'pdf';
      // this.qp = new QueryParams(querys);
    });
  }

  get isSns(): boolean {
    return this.userModel.authType !== UserModel.Auth.id;
  }

  get siteModel(): SiteModel {
    return this._api.siteModel;
  }

  get siteSettingModel(): SiteSettingModel {
    return this.siteModel.siteSettingModel;
  }

  async onClickChkDup(key: string) {
    const ftag = `onClickChkDup(),`;
    try {
      const body: any = {};
      switch (key) {
        case 'userId': {
          body.userId = this.userModel.userId;
          break;
        }
        case 'email': {
          body.email = this.userModel.email;
          break;
        }
        case 'nickname': {
          body.nickname = this.userModel.nickname;
          break;
        }
      }
      this.isLoading = true;
      const res = await this._api.reqAuthCmd('check_dup', body);
      this.isLoading = false;
      console.log(ftag, 'res=', res);
      if (res.result) {
        DlgUtil.showSnack(this._sb, res.result.message);
      }
    } catch (err) {
      this.isLoading = false;
      console.log(ftag, 'err=', err);
    }
  }

  get validateErr(): string {
    const ftag = `validateErr(),`;

    if (this.siteModel.accountType === SiteModel.AccountType.id && !this.isSns) {
      if (!this.userModel.userId) {
        return `아이디를 입력하세요.`;
      }
    }
    if (!this.userModel.email) {
      return `이메일 주소 입력하세요.`;
    }

  }

  async onClickSubmit() {
    const ftag = `onClickSubmit(),`;
    try {
      console.log(ftag, 'userModel=', this.userModel.getAttrs());
      this.isLoading = true;
      let cmd = this.isSns ? 'sns_signup':'client_signup';
      const res = await this._api.reqAuthCmd(cmd, this.userModel.getAttrs());
      this.isLoading = false;
      console.log(ftag, 'res=', res);
      if (res.error) {
        DlgUtil.showErrIfMsg(this._dlg, res.error);
        return;
      }
      if (res.result) {
        this._api.config.tokenInfo = res.result;
        await this._api.reqGetMe();
        console.log(ftag, 'me=', this._api.me);
        DlgUtil.showSnack(this._sb, `가입이 완료되었습니다.`);
        this._api.navigate(`/p/h`);
      }
    } catch (err) {
      this.isLoading = false;
      console.log(ftag, 'err=', err);
    }
  }

}
