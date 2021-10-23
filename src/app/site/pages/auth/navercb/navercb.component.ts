import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { SiteModel } from 'src/app/models/site/site.model';
import { UserModel } from 'src/app/models/users/user-model';
import { ApiService } from 'src/app/service/api.service';
import { ConfigService } from 'src/app/service/config.service';
import { fadeIn } from 'src/app/share/animations/fade-in.animation';
import DlgUtil from 'src/app/utils/dlg.util';

// https://tktk.crazyupinc.com/theenm/p/a/navercb#access_token=AAAAOvTIScJF_fbhOr9ml-5KN5ZirDX-2TzTum6v-5jroD5hnruxohifNbxmsUlhJGBpDutr9iotVq9HYNyRS_BXxqI&state=a24846f4-c97b-4831-b55e-ce6753ee52a0&token_type=bearer&expires_in=3600
// http://localhost:1290/theenm/p/a/navercb#access_token=AAAAOvTIScJF_fbhOr9ml-5KN5ZirDX-2TzTum6v-5jroD5hnruxohifNbxmsUlhJGBpDutr9iotVq9HYNyRS_BXxqI&state=a24846f4-c97b-4831-b55e-ce6753ee52a0&token_type=bearer&expires_in=3600

@Component({
  selector: 'app-navercb',
  templateUrl: './navercb.component.html',
  animations: [fadeIn,],
})
export class NavercbComponent implements OnInit {

  isLoading = false;
  userModel: UserModel;

  constructor(
    private _http: HttpClient,
    private _api: ApiService,
    private _aRoute: ActivatedRoute,
    private _sb: MatSnackBar,
    private _dlg: MatDialog,
  ) { }

  ngOnInit(): void {
    const ftag = `ngOnInit(),`;
    // console.log(ftag, 'siteModel=', this.siteModel);
    this.nid_me();
  }

  parseParams() {
    const ftag = `parseParams()`;
    // const url = win

    this._aRoute.queryParams.subscribe((querys) => {
      console.log(ftag, 'querys=', querys);
      // this.userModel = new UserModel(_.clone(querys));
      // this.userModel.authType = this.userModel.authType || UserModel.Auth.id;
      // console.log(ftag, 'userModel=', this.userModel);
      // console.log(ftag, 'isSns=', this.isSns);
      // querys.title = querys.title || 'pdf';
      // this.qp = new QueryParams(querys);
    });
  }

  get siteModel(): SiteModel {
    return this._api.siteModel;
  }

  async nid_me() {
    const ftag = `nid_me(),`;
    try {
      console.log(ftag, 'currentUrl=', this._api.currentUrl);
      const rs = `/${this.siteModel.siteId}/p/a/navercb#`;
      const url = this._api.currentUrl.replace(rs, '');
      console.log(ftag, 'url=', url);
      const tokens = JSON.parse('{"' + decodeURI(url).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"') + '"}');
      console.log(ftag, 'tokens=', tokens);
      this.isLoading = true;
      const res = await this._api.reqAuthCmd('naver_me', tokens);
      this.isLoading = false;
      console.log(ftag, 'res=', res);
      if (res.error) {
        DlgUtil.showIfErrMsg(this._dlg, res);
        return;
      }
      if (res.result) {
        if (res.result.response) {
          const userModel = new UserModel();
          userModel.authType = UserModel.Auth.naver;
          userModel.authId = res.result.response.id;
          if (res.result.response.email) {
            userModel.email = res.result.response.email;
          }  
          await this.sns_signin(userModel);
        }
      }
    } catch (err) {
      this.isLoading = false;
      console.log(ftag, 'err=', err);
    }
  }


  async sns_signin(userModel: UserModel) {
    const ftag = `sns_signin(${userModel.authType}),`;
    try {
      this.isLoading = true;
      const res = await this._api.reqAuthCmd('sns_signin', userModel.getAttrs());
      this.isLoading = false;
      console.log(ftag, 'res=', res);
      if (res.error) {
        this.onLoginErr(res);
        return;
      }
      if (res.result) {
        this.rememberMe = false;
        if (res.result.need_signup_sns) {
          this._api.navigate(`/p/a/sign-up`, {
            queryParams: userModel.getAttrs(),
          })
          return;
        }
        await this.onLoginSuccess(res);
      }
    } catch (err) {
      this.isLoading = false;
      console.log(ftag, 'err=', err);
    }
  }


  onLoginErr(res: any) {
    // https://trello.com/c/y0hKHRHq/107-휴면계정-해제-시나리오-문의
    // https://tktk.crazyupinc.com/theenm/p/pdf?pageNo=103
    if (res.error.code === UserModel.ErrCd_DORMANT_USER) {
      this.gotoDormant(res);
      return;
    }
    DlgUtil.showErrIfMsg(this._dlg, res.error);
  }

  async onLoginSuccess(res: any) {
    this._api.config.tokenInfo = res.result;
    this.isLoading = true;
    await this._api.reqGetMe();
    this.isLoading = false;
    if (this.rememberMe) {
      this.config.rememberAuthId = this._api.me.authId;
    }
    this._api.navigate(`/p/h`);

  }

  gotoDormant(res: any) {
    this._api.navigate(`/p/a/dormant-release`, {
      queryParams: {
        t: res.error.name,
      },
      replaceUrl: true,
    });
  }

  get rememberMe(): boolean {
    return this.config.rememberMe;
  }

  set rememberMe(value: boolean) {
    this.config.rememberMe = value;
  }

  get config(): ConfigService {
    return this._api.config;
  }
}
