import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/service/api.service';
import { fadeIn } from 'src/app/share/animations/fade-in.animation';
import * as _ from 'lodash';
import DlgUtil from 'src/app/utils/dlg.util';
import { OtoqParam } from 'src/app/models/cs/otoq.param';
import { OtoqModel } from 'src/app/models/cs/otoq.model';
import { FileResource } from 'src/app/models/base/file-resource';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Cd } from 'src/app/models/codes/cd';

// https://tktk.crazyupinc.com/theenm/p/pdf?pageNo=95


@Component({
  selector: 'app-oto-detail',
  templateUrl: './oto-detail.component.html',
  animations: [fadeIn],
})
export class OtoDetailComponent implements OnInit {

  isLoading = false;
  // qp: OtoqParam = new OtoqParam();
  model: OtoqModel;


  constructor(
    private _api: ApiService,
    private _aRoute: ActivatedRoute,
    private _dlg: MatDialog,
  ) { }

  ngOnInit(): void {
    // this._pApi.items = null;  
    this.parseParams();
  }

  parseParams() {
    const ftag = `parseParams()`;
    this._aRoute.queryParams.subscribe((querys) => {
      // console.log(ftag, 'querys=', querys);
      const q = _.clone(querys);
      const qp = new OtoqParam(q);
      // console.log(ftag, 'pageParams=', this.pageParams.getAttrs());
      // console.log(ftag, 'searchWord=', this.pageParams.get('searchWord'));
      this.loadModel(qp.token);
    });
  }

  async loadModel(token: string) {
    const ftag = `loadModel(),`;
    try {
      this.isLoading = true;

      // this.qp.searchKey = 'title+content';
      // console.log(ftag, 'qp=', this.qp.getAttrs());
      const res: any = await this._api.reqQnaCmd('qna_get', {
        token: token,
      });
      console.log(ftag, 'res=', res);
      this.isLoading = false;
      if (res.error) {
        DlgUtil.showErrIfMsg(this._dlg, res.error);
        return;
      }
      if (res.result) {
        this.model = new OtoqModel(res.result);
      }
      console.log(ftag, 'model=', this.model);
    } catch (err) {
      this.isLoading = false;
      console.log(ftag, 'err=', err);
    }
  }

  onClickOk() {
    this._api.goBack();
  }

}
