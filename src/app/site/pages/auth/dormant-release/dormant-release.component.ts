import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Cd } from 'src/app/models/codes/cd';
import { SiteModel } from 'src/app/models/site/site.model';
import { UserProcessModel } from 'src/app/models/users/user-process.model';
import { ApiService } from 'src/app/service/api.service';
import { fadeIn } from 'src/app/share/animations/fade-in.animation';
import DlgUtil from 'src/app/utils/dlg.util';

// https://tktk.crazyupinc.com/theenm/p/pdf?pageNo=103
// https://www.figma.com/file/5McWa4BMFFXRDM4qfsklr4/tikitaka-user?node-id=250%3A19731

@Component({
  selector: 'app-dormant-release',
  templateUrl: './dormant-release.component.html',
  animations: [fadeIn,],
})
export class DormantReleaseComponent implements OnInit {

  isLoading = true;
  model: UserProcessModel;

  constructor(
    private _api: ApiService,
    private _aRoute: ActivatedRoute,
    private _sb: MatSnackBar,
    private _dlg: MatDialog,
  ) { }

  ngOnInit(): void {
    const ftag = `ngOnInit(),`;
    this.parseParams();
    console.log(ftag, 'siteModel=', this.siteModel);
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
      if (!t) {
        const ref = DlgUtil.showConfirm(this._dlg, {
          title: `유효하지 않은 세션입니다.`,
          okBtnColor: 'primary',
          showCancel: Cd.YN.N,
        });
        ref.afterClosed().subscribe(result => {
          // console.log(ftag, 'result=', result);
          this._api.navigate(`/p/a/sign-in`, {
            replaceUrl: true,
          });
        });
        return;
      }
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
    } catch (err) {
      this.isLoading = false;
      console.log(ftag, 'err=', err);
    }
  }

  async onClickSubmit() {
    const ftag = `onClickSubmit(),`;
    try {
      if (!this.model.email) {
        DlgUtil.showSnack(this._sb, `이메일 주소를 입력해 주세요.`);
        return;
      }
      this.isLoading = true;
      const res = await this._api.reqDormantCmd('dr_send_mail', this.model.getAttrs());
      this.isLoading = false;
      console.log(ftag, 'res=', res);
      if (res.error) {
        DlgUtil.showIfErrMsg(this._dlg, res);
        return;
      }
      if (res.result) {
        const ref = DlgUtil.showConfirm(this._dlg, {
          title: `인증메일이 발송 되었습니다.`,
          okBtnColor: 'primary',
          showCancel: Cd.YN.N,
        });
        ref.afterClosed().subscribe(result => {
          // console.log(ftag, 'result=', result);
          this._api.goBack();
        });
      }
    } catch (err) {
      this.isLoading = false;
      console.log(ftag, 'err=', err);
    }
  }

}
