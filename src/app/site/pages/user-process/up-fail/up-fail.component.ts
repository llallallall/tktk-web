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

@Component({
  selector: 'app-up-fail',
  templateUrl: './up-fail.component.html',
  animations: [fadeIn,],
})
export class UpFailComponent implements OnInit {

  isLoading = true;
  model = new UserProcessModel();

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
      // if (this.model.expireTs < (new Date()).getTime()) {
      //   this._api.navigate('/p/up/fail', {
      //     queryParams: {
      //       t: t,
      //     }
      //   });
      //   return;
      // }
    } catch (err) {
      this.isLoading = false;
      console.log(ftag, 'err=', err);
    }
  }



}
