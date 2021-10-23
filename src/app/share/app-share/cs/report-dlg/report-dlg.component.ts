import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ReportModel } from 'src/app/models/cs/report.model';
import { ApiService } from 'src/app/service/api.service';
import { fadeIn } from 'src/app/share/animations/fade-in.animation';
import DlgUtil from 'src/app/utils/dlg.util';


@Component({
  selector: 'app-report-dlg',
  templateUrl: './report-dlg.component.html',
  animations: [fadeIn,],
})
export class ReportDlgComponent implements OnInit {

  isLoading = false;

  constructor(
    private _api: ApiService,
    private _dlg: MatDialog,
    private _sb: MatSnackBar,
    public dialogRef: MatDialogRef<ReportDlgComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {
      reportModel: ReportModel,
    },
  ) {
  }

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  get okBtnName(): string {
    return '신고';
  }

  async onClickSubmit() {
    const ftag = `onClickSubmit(),`;
    try {
      if (!this.data.reportModel.content) {
        return;
      }
      this.isLoading = true;
      const res = await this._api.reqReportCmd('report_put', this.data.reportModel.getAttrs());
      this.isLoading = false;
      console.log(ftag, 'res=', res);
      if (res.error) {
        DlgUtil.showIfErrMsg(this._dlg, res);
        return;
      }
      if (res.result) {
        DlgUtil.showSnack(this._sb, `신고하였습니다.`);
        this.dialogRef.close(res.result);
      }
    } catch (err) {
      this.isLoading = false;
      console.log(ftag, 'err=', err);
    }

    // this.dialogRef.close({
    //   btnId: 'ok',
    //   data: this.data,
    // });
  }

  // get value(): any {
  //   return this.data.value;
  // }

  // set value(v: any) {
  //   this.data.value = v;
  // }


}
