import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { fadeIn } from 'src/app/share/animations/fade-in.animation';

@Component({
  selector: 'app-text-input-dlg',
  templateUrl: './text-input-dlg.component.html',
  animations: [fadeIn,],
})
export class TextInputDlgComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<TextInputDlgComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    data.okBtnColor = data.okBtnColor || 'primary';
   }

  ngOnInit(): void {
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

  get value(): any {
    return this.data.value;
  }
  
  set value(v: any) {
    this.data.value = v;
  }

}
