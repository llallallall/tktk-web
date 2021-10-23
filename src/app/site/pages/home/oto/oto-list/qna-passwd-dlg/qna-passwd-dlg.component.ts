import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Cd } from 'src/app/models/codes/cd';
import { OtoqModel } from 'src/app/models/cs/otoq.model';
import { ApiService } from 'src/app/service/api.service';
import { fadeIn } from 'src/app/share/animations/fade-in.animation';


@Component({
  selector: 'app-qna-passwd-dlg',
  templateUrl: './qna-passwd-dlg.component.html',
  animations: [fadeIn,],
})
export class QnaPasswdDlgComponent implements OnInit {

  passwd: string;
  isLoading = false;

  constructor(
    private _api: ApiService,
    public dialogRef: MatDialogRef<QnaPasswdDlgComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {
      model: OtoqModel
    },
  ) {
  }

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  get okBtnName(): string {
    return '확인';
  }

  async onClickOk() {
    const ftag = `onClickOk(),`;
    try {
      this.isLoading = true;
      const res = await this._api.reqQnaCmd(`qna_access_token`, {
        objectId: this.data.model.objectId,
        passwd: this.passwd,
      })
      this.isLoading = false;
      console.log(ftag, 'res=', res);
      this.dialogRef.close(res);
    } catch (err) {
      this.isLoading = false;
      console.log(ftag, 'err=', err);
    }

  }



}
