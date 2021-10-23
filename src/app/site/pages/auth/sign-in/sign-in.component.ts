import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GoogleLoginProvider, SocialAuthService } from 'angularx-social-login';
import { SiteModel } from 'src/app/models/site/site.model';
import { UserModel } from 'src/app/models/users/user-model';
import { ApiService } from 'src/app/service/api.service';
import { ConfigService } from 'src/app/service/config.service';
import { fadeIn } from 'src/app/share/animations/fade-in.animation';
import DateUtil from 'src/app/utils/date-util';
import DlgUtil from 'src/app/utils/dlg.util';
import { environment } from 'src/environments/environment';

// https://www.figma.com/file/5McWa4BMFFXRDM4qfsklr4/tikitaka-user?node-id=112%3A4689
// https://tktk.crazyupinc.com/theenm/p/pdf?pageNo=7

declare global {
  interface Window {
    naver: any;
  }
};
const { naver } = window;
declare let Kakao: any;


@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  animations: [fadeIn,],
  styleUrls: ['./sign-in.component.scss',],
})
export class SignInComponent implements OnInit {

  isLoading = false;
  userModel = new UserModel();
  naverLogin: any;

  constructor(
    private _api: ApiService,
    private _sb: MatSnackBar,
    private _dlg: MatDialog,
    private _gauth: SocialAuthService,
  ) { }

  ngOnInit(): void {
    const ftag = `ngOnInit(),`;
    // console.log(ftag, 'siteModel=', this.siteModel);
    // const nl = new naver.LoginWithNaverId({});
    // console.log(ftag, 'nl=', nl);
    this.initKakao();
    this.initNaver();
    this.initGoogle();
  }

  ngAfterViewInit(): void {
    const ftag = `ngAfterViewInit(),`;

    this.naverLogin.getLoginStatus(this.naver_on_loginStatus.bind(this));
    // this.naverLogin.getLoginStatus(function (status) {
    //     if (status) {
    //       console.log(ftag, `status=`, status);
    //       // var email = naverLogin.user.getEmail(); // 필수로 설정할것을 받아와 아래처럼 조건문을 줍니다.

    //       // console.log(naverLogin.user);

    //       // if (email == undefined || email == null) {
    //       //   alert("이메일은 필수정보입니다. 정보제공을 동의해주세요.");
    //       //   naverLogin.reprompt();
    //       //   return;
    //       // }
    //     } else {
    //       console.log(ftag, `callback 처리에 실패하였습니다.`);
    //     }
    //   });    
  }

  naver_on_loginStatus(status: any) {
    const ftag = `naver_on_loginStatus(),`;
    console.log(ftag, `status=`, status);
    if (status) {
      console.log(ftag, `user=`, this.naverLogin.user);
      if (this.naverLogin.user) {
        this.naverLogin.logout();
      }
    }
  }

  initKakao() {
    const ftag = `initKakao(),`;
    Kakao.init(environment.clientIdKakao,);

    Kakao.Auth.createLoginButton({
      container: '#kakao-login-btn',
      success: this.kakao_success.bind(this),
      fail: this.kakao_err.bind(this),
    });
    console.log(ftag, 'Kakao=', Kakao);
  }

  async kakao_me(response: any) {
    const ftag = `kakao_me(),`;
    console.log(ftag, 'response=', response);
    const userModel = new UserModel();
    userModel.authType = UserModel.Auth.kakao;
    userModel.authId = response.id;
    if (response.kakao_account && response.kakao_account.email) {
      userModel.email = response.kakao_account.email;
    }
    await this.sns_signin(userModel);
  }


  kakao_success(authObj: any) {
    const ftag = `kakao_success(),`;
    console.log(ftag, 'authObj=', authObj);
    Kakao.API.request({
      url: '/v2/user/me',
      data: {
        property_keys: ["kakao_account.email", "kakao_account.gender"]
      },
      success: this.kakao_me.bind(this),
      fail: function (error) {
        console.log(ftag, 'error=', error);
      }
    });
  }

  kakao_err(err: any) {
    const ftag = `kakao_err(),`;
    console.log(ftag, 'err=', err);
    if (err.error_description) {
      DlgUtil.showErr(this._dlg, err.error_description, '로그인 실패');
    }
  }

  // https://nid.naver.com/oauth2.0/authorize?response_type=token&client_id=jyvqXeaVOVmV&state=ab8d1ee3-93d5-48e0-bf35-ea41460a4b33&redirect_uri=https%3A%2F%2Fstatic.nid.naver.com%2Foauth%2Fsample%2Fcallback.html&version=js-2.0.1

  initNaver() {
    const ftag = `initNaver(),`;

    const callbackUrl = `${environment.hostUrl}/${this.siteModel.siteId}/p/a/navercb`;
    console.log(ftag, 'callbackUrl=', callbackUrl);

    this.naverLogin = new naver.LoginWithNaverId({
      clientId: environment.clientIdNaver,
      callbackUrl: callbackUrl,
      // callbackUrl: `${environment.hostUrl}/theenm/p/a/sign-in`,
      // callbackUrl: `${environment.hostUrl}`,
      isPopup: true,
      loginButton: { color: "green", type: 3, height: 0 },
      // callbackHandle: true
    });
    this.naverLogin.init();
    console.log(ftag, 'naverLogin=', this.naverLogin);
    // window.addEventListener('load', function () {
    //   naverLogin.getLoginStatus(function (status) {
    //     if (status) {
    //       var email = naverLogin.user.getEmail(); // 필수로 설정할것을 받아와 아래처럼 조건문을 줍니다.

    //       console.log(naverLogin.user);

    //       if (email == undefined || email == null) {
    //         alert("이메일은 필수정보입니다. 정보제공을 동의해주세요.");
    //         naverLogin.reprompt();
    //         return;
    //       }
    //     } else {
    //       console.log("callback 처리에 실패하였습니다.");
    //     }
    //   });
    // });
    const aurl = this.naverLogin.generateAuthorizeUrl();
    console.log(ftag, 'aurl=', aurl);
  }

  onClickNaverLogin() {
    const ftag = `onClickNaverLogin(),`;
    const aurl = this.naverLogin.generateAuthorizeUrl();
    console.log(ftag, 'aurl=', aurl);
    window.location = aurl;
  }

  initGoogle() {
    const ftag = `initGoogle(),`;
    this._gauth.authState.subscribe((user) => {
      console.log(ftag, 'user=', user);
    });
  }

  async signInWithGoogle() {
    const ftag = `signInWithGoogle(),`;
    try {
      console.log(ftag,);
      const user = await this._gauth.signIn(GoogleLoginProvider.PROVIDER_ID, {
        prompt: 'consent',
        cookiepolicy: 'single_host_origin',
      });
      console.log(ftag, 'user=', user);
      if (user && user.id) {
        const userModel = new UserModel();
        userModel.authType = UserModel.Auth.google;
        userModel.authId = user.id;
        userModel.name = user.name;
        userModel.email = user.email;
        await this.sns_signin(userModel);
      }

    } catch (err) {
      console.log(ftag, 'err=', err);
    }
  }

  get config(): ConfigService {
    return this._api.config;
  }

  get siteModel(): SiteModel {
    return this._api.siteModel;
  }

  onClickSignup() {
    this._api.navigate('/p/a/sign-up');
  }

  onClickPasswd() {
    this._api.navigate('/p/a/find-pass');
  }

  async onClickSubmit() {
    const ftag = `onClickSubmit(),`;
    try {
      this.userModel.authType = UserModel.Auth.id;
      this.isLoading = true;
      const res = await this._api.reqAuthCmd('sign_in', this.userModel.getAttrs());
      this.isLoading = false;
      console.log(ftag, 'res=', res);
      if (res.error) {
        this.onLoginErr(res);
        return;
      }
      if (res.result) {
        await this.onLoginSuccess(res);
      }
    } catch (err) {
      this.isLoading = false;
      console.log(ftag, 'err=', err);
    }
  }

  get rememberMe(): boolean {
    return this.config.rememberMe;
  }

  set rememberMe(value: boolean) {
    this.config.rememberMe = value;
  }

  onClickGoogle() {
    this.signInWithGoogle();
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
    const ftag = `onLoginSuccess(),`;

    this._api.config.tokenInfo = res.result;
    this.isLoading = true;
    await this._api.reqGetMe();
    this.isLoading = false;
    if (this.rememberMe) {
      this.config.rememberAuthId = this._api.me.authId;
    }
    const me = this._api.me;
    if (me.joinType === UserModel.JoinType.general) {
      console.log(ftag, 'me=', this._api.me);
      const date = new Date(me.passwdChangedTs || 0);
      const diffDay = DateUtil.diffDay(new Date(), date);
      console.log(ftag, 'diffDay=', diffDay);
      if (diffDay > 90) {
        this._api.navigate(`/p/a/pass-exceed`, {
          replaceUrl: true,
        });        
        return;
      }
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


}
