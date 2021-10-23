import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ErrDlgComponent } from '../share/app-share/dlg/err-dlg/err-dlg.component';
import { ConfirmDlgComponent } from '../share/app-share/dlg/confirm-dlg/confirm-dlg.component';
import { MatSnackBar } from '@angular/material/snack-bar';



export default class AreaUtil { 

  public static readonly Items = [
    '서울',
    '부산',
    '대구',
    '인천',
    '광주',
    '대전',
    '울산',
    '세종',
    '경기도',
    '강원도',
    '충청북도',
    '충청남도',
    '전라북도',
    '전라남도',
    '경상북도',
    '경상남도',
    '제주도',
  ];

  public static readonly Default = AreaUtil.Items[0];

}
