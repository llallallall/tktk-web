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

// https://tktk.crazyupinc.com/theenm/p/pdf?pageNo=93


@Component({
  selector: 'app-oto-add',
  templateUrl: './oto-add.component.html',
  animations: [fadeIn,],
})
export class OtoAddComponent implements OnInit {

  isLoading = false;
  model = new OtoqModel();


  constructor(
    private _api: ApiService,
    private _aRoute: ActivatedRoute,
    private _dlg: MatDialog,
    private _sb: MatSnackBar,
  ) { }


  ngOnInit(): void {
  }

  onFileChnagEvent($event) {
    const ftag = `onFileChnagEvent(),`;
    this.onFileChanged($event.target.files[0]);

    // const files = event.target.files;
    // const file = files[0];
    // // console.log(ftag, 'type=', file.type);
    // const reader = new FileReader();
    // reader.onload = this.onloadXlsx.bind(this);
    // reader.readAsBinaryString(file);
  }

  onFileChanged(file: File) {
    const ftag = `onFileChanged(),`;
    // console.log(ftag, '$event=', $event);
    const fr = new FileResource();
    this.model.localResource = fr;
    fr.fileLocal = file;
    // this.model.imgItems.push(fr);
    var reader = new FileReader();
    reader.onload = function (event) {
      // console.log(ftag, 'result=', event.target.result);
      fr.fileLocalSrc = event.target.result;
      console.log(ftag, 'fr=', fr);
    };
    reader.readAsDataURL(fr.fileLocal);
  }

  async onClickSubmit() {
    const ftag = `onClickSubmit(),`;
    try {
      if (this.model.validErr) {
        DlgUtil.showSnack(this._sb, this.model.validErr);
        return;
      }
      this.isLoading = true;
      const res = await this._api.reqQnaCmd('qna_create', this.model.getAttrs());
      this.isLoading = false;
      console.log(ftag, 'res=', res);
      if (res.error) {
        DlgUtil.showIfErrMsg(this._dlg, res);
        return;
      }
      if (res.result) {
        const model = new OtoqModel(res.result);
        if (this.model.localResource) {
          this.isLoading = true;
          const res2 = await this._api.reqUploadResource(
            this.model.localResource.fileLocal,
            Cd.FileClass.qna_attach,
            this.model.objectId);
          this.isLoading = false;
          console.log(ftag, 'res2=', res2);
          if (res2.result) {
            const mRes = new FileResource(res2.result);
            model.fileId = mRes.fileId;
            this.isLoading = true;
            const res3 = await this._api.reqBannerCmd('qna_update', {
              objectId: model.objectId,
              fileId: model.fileId,
            });
            this.isLoading = false;
            console.log(ftag, 'res3=', res3);
          }
        }

        const ref = DlgUtil.showConfirm(this._dlg, {
          title: `문의가 등록되었습니다.`,
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

  onClickCancel() {
    if (this.model.hasChanged()) {
      const ref = DlgUtil.showConfirm(this._dlg, {
        title: `입력한 내용은 저장되지 않습니다.`,
        okBtnColor: 'primary',
      });
      ref.afterClosed().subscribe(result => {
        // console.log(ftag, 'result=', result);
        if (result) {
          this._api.goBack();
        }
      });
    } else {
      this._api.goBack();
    }
  }

  on_changed_qclass($event) {
    this.model.questionClassIdx = $event;
  }

}
