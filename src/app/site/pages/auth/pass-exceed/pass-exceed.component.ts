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
import PasswdUtil from 'src/app/utils/passwd.util';

// https://www.figma.com/file/5McWa4BMFFXRDM4qfsklr4/tikitaka-user?node-id=250%3A20198
// https://tktk.crazyupinc.com/theenm/p/pdf?pageNo=107

@Component({
  selector: 'app-pass-exceed',
  templateUrl: './pass-exceed.component.html',
  styleUrls: ['./pass-exceed.component.scss',],
  animations: [fadeIn,],
})
export class PassExceedComponent implements OnInit {

  isLoading = false;
  model = new UserModel();

  constructor(
    private _api: ApiService,
    private _aRoute: ActivatedRoute,
    private _sb: MatSnackBar,
    private _dlg: MatDialog,
  ) { }

  ngOnInit(): void {
    const ftag = `ngOnInit(),`;
    // this.parseParams();
    console.log(ftag, 'siteModel=', this.siteModel);
  }

  // parseParams() {
  //   const ftag = `parseParams()`;
  //   this._aRoute.queryParams.subscribe((querys) => {
  //     console.log(ftag, 'querys=', querys);
  //     // querys.title = querys.title || 'pdf';      
  //     this.parse_token(querys.t);
  //   });
  // }

  get siteModel(): SiteModel {
    return this._api.siteModel;
  }

  get validErr(): string {
    if (!this.model.passwd) {
      return `비밀번호를 입력해 주세요.`;
    }
    if (!this.model.passwdConfirm) {
      return `비밀번호 확인을 입력해 주세요.`;
    }
    if (this.model.passwd !== this.model.passwdConfirm) {
      return `비밀번호가 일치하지 않습니다.`;
    }
    return PasswdUtil.validateAdm(this.model.passwd);
  }

  async onClickSubmit() {
    const ftag = `onClickSubmit(),`;
    try {
      if (this.validErr) {
        DlgUtil.showSnack(this._sb, this.validErr);
        return;
      }
      this.isLoading = true;
      const res = await this._api.reqUsersCmd('update_passwd', this.model.getAttrs());
      this.isLoading = false;
      console.log(ftag, 'res=', res);
      if (res.error) {
        DlgUtil.showIfErrMsg(this._dlg, res);
        return;
      }
      if (res.result) {
        const ref = DlgUtil.showConfirm(this._dlg, {
          title: `비밀번호변경이완료되었습니다. 다시로그인해주세요`,
          okBtnColor: 'primary',
          showCancel: Cd.YN.N,
        });
        ref.afterClosed().subscribe(result => {
          // console.log(ftag, 'result=', result);
          this._api.navigate('/p/a', {
            replaceUrl: true,
          });
        });
      }
    } catch (err) {
      this.isLoading = false;
      console.log(ftag, 'err=', err);
    }
  }

  onClickNext() {
    this._api.navigate('/p/h');

  }

}
