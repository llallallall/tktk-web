import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Cd } from 'src/app/models/codes/cd';
import { fadeIn } from 'src/app/share/animations/fade-in.animation';

@Component({
  selector: 'app-wd-confirm-dlg',
  templateUrl: './wd-confirm-dlg.component.html',
  animations: [fadeIn,],
})
export class WdConfirmDlgComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<WdConfirmDlgComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any = {},
  ) { 
    data.okBtnColor = data.okBtnColor || 'warn';
    data.cancelBtnColor = data.cancelBtnColor || 'accent';
    data.showCancel = data.showCancel || Cd.YN.Y;
    data.message = data.message || '위 내용을 확인했습니다';
  }

  ngOnInit() {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }  

  get okBtnName(): string {
    return this.data.okBtnName || '탈퇴';
  }

  onClickOk() {
    this.dialogRef.close({
      btnId: 'ok',
      data: this.data,
    });
  }
}
