import { Component, OnInit, Inject, Input } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { fadeIn } from 'src/app/share/animations/fade-in.animation';

@Component({
  selector: 'app-err-dlg',
  templateUrl: './err-dlg.component.html',
  styleUrls:['./err-dlg.component.scss'],
  animations: [fadeIn,],
})
export class ErrDlgComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ErrDlgComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { 
    this.checkErrId();
  }

  ngOnInit() {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  async checkErrId() {
    const ftag = `checkErrId(${this.errId}),`;
    
    if (this.errId) {
      // this.data.errorMessage = await this.translate.get(`err.${this.errId}`).toPromise();
      // this.data.errorTitle = await this.translate.get(`err.${this.data.errorTitle}`).toPromise() || this.data.errorTitle;
      // console.log(ftag, 'errorMessage=', this.data.errorMessage);
    }
  }

  get errId(): string {
    return this.data.errId;
  }
}
