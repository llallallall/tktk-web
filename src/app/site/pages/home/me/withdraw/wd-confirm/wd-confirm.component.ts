import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserModel } from 'src/app/models/users/user-model';
import { ApiService } from 'src/app/service/api.service';
import { fadeIn } from 'src/app/share/animations/fade-in.animation';
import DlgUtil from 'src/app/utils/dlg.util';
import * as _ from 'lodash';
import { WdConfirmDlgComponent } from './wd-confirm-dlg/wd-confirm-dlg.component';



@Component({
  selector: 'app-wd-confirm',
  templateUrl: './wd-confirm.component.html',
  animations: [fadeIn,],
})
export class WdConfirmComponent implements OnInit {

  isLoading = false;

  constructor(
    private _api: ApiService,
    private _sb: MatSnackBar,
    private _dlg: MatDialog,
  ) { }

  ngOnInit(): void {
    const ftag = `ngOnInit(),`;
    // console.log(ftag, 'siteModel=', this.siteModel);
    this.loadModel();
  }

  get me(): UserModel {
    return this._api.me;
  }

  async loadModel() {
    const ftag = `loadModel(),`;
    try {
      this.isLoading = true;
      await this._api.reqGetMeIfNeed();
      this.isLoading = false;
    } catch (err) {
      this.isLoading = false;
      console.log(ftag, 'err=', err);
    }
  }

  async onClickSubmit() {
    const ftag = `onClickSubmit(),`;
    const ref = this._dlg.open(WdConfirmDlgComponent, {
      width: '300px',
      data: {},
      autoFocus: false,
    });

    ref.afterClosed().subscribe(result => {
      // console.log(ftag, 'result=', result);
      if (result) {
        this.user_withdraw();
      }
    });
  }

  onClickCancel() {
    this._api.navigate(`/p/h`);
  }

  async user_withdraw() {
    const ftag = `user_withdraw(),`;
    try {
      this.isLoading = true;
      const res = await this._api.reqUsersCmd('user_withdraw');
      this.isLoading = false;
      console.log(ftag, 'res=', res);
      if (res.error) {
        DlgUtil.showErrIfMsg(this._dlg, res.error);
        return;
      }
      if (res.result) {
        DlgUtil.showSnack(this._sb, `탈퇴되었습니다.`);
        this._api.config.tokenInfo = null;
        this._api.me = null;
        this._api.navigate(`/p/h`);
      }
    } catch (err) {
      this.isLoading = false;
      console.log(ftag, 'err=', err);
    }
  }

}
