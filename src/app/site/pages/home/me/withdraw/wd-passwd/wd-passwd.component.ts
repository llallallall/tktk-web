import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserModel } from 'src/app/models/users/user-model';
import { ApiService } from 'src/app/service/api.service';
import { fadeIn } from 'src/app/share/animations/fade-in.animation';
import DlgUtil from 'src/app/utils/dlg.util';
import * as _ from 'lodash';


@Component({
  selector: 'app-wd-passwd',
  templateUrl: './wd-passwd.component.html',
  animations: [fadeIn,],
})
export class WdPasswdComponent implements OnInit {

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
    try {
      this.isLoading = true;
      const res = await this._api.reqAuthCmd('pass_check', {
        passwd: this.me.passwd,
      });
      this.isLoading = false;
      console.log(ftag, 'res=', res);
      if (res.error) {
        DlgUtil.showErrIfMsg(this._dlg, res.error);
        return;
      }
      if (res.result) {
        this._api.navigate(`/p/h/me/wd/confirm`);
      }
    } catch (err) {
      this.isLoading = false;
      console.log(ftag, 'err=', err);
    }
  }

  // onClickEdit() {
  //   this._api.navigate('/p/h/me/edit');
  // }

  // onClickWithdrawn() {
  //   // http://localhost:1290/theenm/p/pdf?title=%EB%82%B4%EC%A0%95%EB%B3%B4%20page&pageNo=70
  //   this._api.navigate('/p/h/me/wd');
  // }

}
