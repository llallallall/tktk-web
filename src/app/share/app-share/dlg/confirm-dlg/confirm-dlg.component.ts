import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Cd } from 'src/app/models/codes/cd';
import { fadeIn } from 'src/app/share/animations/fade-in.animation';

@Component({
  selector: 'app-confirm-dlg',
  templateUrl: './confirm-dlg.component.html',
  animations: [fadeIn,],
})
export class ConfirmDlgComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ConfirmDlgComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { 
    data.okBtnColor = data.okBtnColor || 'warn';
    data.cancelBtnColor = data.cancelBtnColor || 'accent';
    data.showCancel = data.showCancel || Cd.YN.Y;
  }

  ngOnInit() {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }  

  get okBtnName(): string {
    return this.data.okBtnName || '확인';
  }

  onClickOk() {
    this.dialogRef.close({
      btnId: 'ok',
      data: this.data,
    });
  }

}
