import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Cd } from 'src/app/models/codes/cd';
import { SiteModel } from 'src/app/models/site/site.model';
import { UserModel } from 'src/app/models/users/user-model';
import { UserProcessModel } from 'src/app/models/users/user-process.model';
import { ApiService } from 'src/app/service/api.service';
import { fadeIn } from 'src/app/share/animations/fade-in.animation';
import DlgUtil from 'src/app/utils/dlg.util';

// https://www.figma.com/file/5McWa4BMFFXRDM4qfsklr4/tikitaka-user?node-id=250%3A19911

@Component({
  selector: 'app-up-dormant-release',
  templateUrl: './up-dormant-release.component.html',
  animations: [fadeIn,],
})
export class UpDormantReleaseComponent implements OnInit {

  isLoading = true;
  model: UserProcessModel;
  userModel = new UserModel();

  constructor(
    private _api: ApiService,
    private _aRoute: ActivatedRoute,
    private _sb: MatSnackBar,
    private _dlg: MatDialog,
  ) { }

  ngOnInit(): void {
    const ftag = `ngOnInit(),`;
    this.parseParams();
    // console.log(ftag, 'siteModel=', this.siteModel);
  }

  parseParams() {
    const ftag = `parseParams()`;
    this._aRoute.queryParams.subscribe((querys) => {
      console.log(ftag, 'querys=', querys);
      // querys.title = querys.title || 'pdf';
      this.dr_execute(querys.t);
    });
  }

  get siteModel(): SiteModel {
    return this._api.siteModel;
  }

  async dr_execute(t: string) {
    const ftag = `dr_execute(),`;
    try {
      this.isLoading = true;
      const res = await this._api.reqDormantCmd('dr_execute', {
        t: t,
      });
      this.isLoading = false;
      if (res.error) {
        const ref = DlgUtil.showIfErrMsg(this._dlg, res);
        ref.afterClosed().subscribe(result => {
          // console.log(ftag, 'result=', result);
          this.gotoFail(t);
        });
        return;
      }
      console.log(ftag, 'res=', res);
      if (res.result) {
        // this.model = new UserProcessModel(res.result);
        this._api.config.tokenInfo = res.result;
        await this._api.reqGetMe();
        console.log(ftag, 'me=', this._api.me);
      }
    } catch (err) {
      this.isLoading = false;
      console.log(ftag, 'err=', err);
    }
  }

  gotoFail(t: string) {
    this._api.navigate('/p/up/fail', {
      queryParams: {
        t: t,
      },
      replaceUrl: true,
    });
  }

  get validErr(): string {
    if (!this.userModel.passwd) {
      return `비밀번호를 입력하세요.`;
    }
  }

  async onClickSubmit() {
    const ftag = `onClickSubmit(),`;
    try {
      this._api.navigate('/p');
    } catch (err) {
      this.isLoading = false;
      console.log(ftag, 'err=', err);
    }

  }

  on_done() {
    const ref = DlgUtil.showConfirm(this._dlg, {
      title: `비밀번호 변경이 완료 되었습니다. 다시 로그인 해주세요.`,
      okBtnColor: 'primary',
      showCancel: Cd.YN.N,
    });
    ref.afterClosed().subscribe(result => {
      // console.log(ftag, 'result=', result);
      this._api.navigate(`/p/a/sign-in`, {
        replaceUrl: true,
      });
    });
  }


}
