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

// https://tktk.crazyupinc.com/theenm/p/pdf?pageNo=12
// https://www.figma.com/file/5McWa4BMFFXRDM4qfsklr4/tikitaka-user?node-id=207%3A10873

@Component({
  selector: 'app-up-change-pw',
  templateUrl: './up-change-pw.component.html',
  animations: [fadeIn,],
})
export class UpChangePwComponent implements OnInit {

  isLoading = false;
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
      this.parse_token(querys.t);
    });
  }

  get siteModel(): SiteModel {
    return this._api.siteModel;
  }

  async parse_token(t: string) {
    const ftag = `parse_token(),`;
    try {
      this.isLoading = true;
      const res = await this._api.reqAuthCmd('parse_token', {
        t: t,
      });
      this.isLoading = false;
      console.log(ftag, 'res=', res);
      if (res.result) {
        this.model = new UserProcessModel(res.result);
      }
      console.log(ftag, 'model=', this.model);
      if (this.model.expireTs < (new Date()).getTime()) {
        console.log(ftag, 'expireTs=', this.model.expireTs);
        this.gotoFail(t);
        return;
      }
      if (this.model.state !== UserProcessModel.St.wait_mail_accept) {
        console.log(ftag, 'state=', this.model.state);
        this.gotoFail(t);
        return;
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
      if (this.validErr) {
        DlgUtil.showSnack(this._sb, this.validErr);
        return;
      }
      this.isLoading = true;
      const res = await this._api.reqPwCmd('pw_change', {
        objectId: this.model.objectId,
        passwd: this.userModel.passwd,
      });
      this.isLoading = false;
      console.log(ftag, 'res=', res);
      if (res.error) {
        DlgUtil.showIfErrMsg(this._dlg, res);
        return;
      }
      console.log(ftag, 'model=', this.model);
      if (res.result) {
        this.model = new UserProcessModel(res.result);
        if (this.model.state === UserProcessModel.St.done) {
          this.on_done();
        }

      }
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
