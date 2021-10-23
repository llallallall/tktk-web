import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ErrDlgComponent } from '../share/app-share/dlg/err-dlg/err-dlg.component';
import { ConfirmDlgComponent } from '../share/app-share/dlg/confirm-dlg/confirm-dlg.component';
// import { ErrorModel } from '../models/base/error-model';
import { MatSnackBar, MatSnackBarRef, SimpleSnackBar } from '@angular/material/snack-bar';
import { ReportDlgComponent } from '../share/app-share/cs/report-dlg/report-dlg.component';
import { ReportModel } from '../models/cs/report.model';
import { ApiService } from '../service/api.service';
import { Cd } from '../models/codes/cd';



export default class DlgUtil {

  static showSnack(snackBar: MatSnackBar, message: string, duration = 1000): MatSnackBarRef<SimpleSnackBar> {
    let snackBarRef = snackBar.open(message, null, {
      duration: duration,
    });
    return snackBarRef;
  }

  static showIfErrMsg(dialog: MatDialog, res: any, title = '오류'): MatDialogRef<ErrDlgComponent> {
    if (!res.error) {
      return;
    }
    return DlgUtil.showErrIfMsg(dialog, res.error, title);
  }


  static showErrIfMsg(dialog: MatDialog, error: any, title = '오류'): MatDialogRef<ErrDlgComponent> {
    if (!error.message) {
      return;
    }
    return DlgUtil.showErr(dialog, error.message, title);
  }

  static showErr(dialog: MatDialog, message: string, title = '오류'): MatDialogRef<ErrDlgComponent> {
    return dialog.open(ErrDlgComponent, {
      width: '300px',
      data: {
        errorMessage: message,
        errorTitle: title,
      },
      autoFocus: false,
      panelClass: 'err-dlg-modal',
    });
  }

  static showErrId(dialog: MatDialog, errId: string, title = '오류'): MatDialogRef<ErrDlgComponent> {
    return dialog.open(ErrDlgComponent, {
      width: '300px',
      data: {
        errorTitle: title,
        errId: errId,
      },
      autoFocus: false,
    });
  }

  static showConfirm(dialog: MatDialog, data: any): MatDialogRef<ConfirmDlgComponent> {
    const dialogRef = dialog.open(ConfirmDlgComponent, {
      width: '300px',
      data: data,
      autoFocus: false,
    });
    return dialogRef;
  }

  static confirmCancel(_api: ApiService, _dlg: MatDialog) {
    const ref = DlgUtil.showConfirm(_dlg, {
      title: `입력한 내용은 저장되지 않습니다.`,
      okBtnColor: 'primary',
    });
    ref.afterClosed().subscribe(result => {
      // console.log(ftag, 'result=', result);
      if (result) {
        _api.goBack();
      }
    });
  }

  static confirmSubmit(_api: ApiService, _dlg: MatDialog, message = `변경이 완료되었습니다.`) {

    const ref = DlgUtil.showConfirm(_dlg, {
      title: message,
      okBtnColor: 'primary',
      showCancel: Cd.YN.N,
    });
    ref.afterClosed().subscribe(result => {
      // console.log(ftag, 'result=', result);
      _api.goBack();
    });
  }


  static showTbd(snackBar: MatSnackBar) {
    snackBar.open('구현 예정입니다.', null, {
      duration: 1000,
    });
  }

  static showReport(dialog: MatDialog, reportModel: ReportModel): MatDialogRef<ReportDlgComponent> {
    const dialogRef = dialog.open(ReportDlgComponent, {
      width: '300px',
      data: {
        reportModel: reportModel,
      },
      autoFocus: false,
    });
    return dialogRef;
  }

  static confirmLogin(_api: ApiService, _dlg: MatDialog, message = `로그인 상태에서 가능한 기능입니다. \n로그인 하시겠습니까?`) {
    if (!_api.me) {
      const ref = DlgUtil.showConfirm(_dlg, {
        title: message,
        okBtnColor: 'primary',
        showCancel: Cd.YN.Y,
      });
      ref.afterClosed().subscribe(result => {
        // console.log(ftag, 'result=', result);
        if (result) {
          _api.config.gotoLogin();
        }
      });
    }
  }  
}
