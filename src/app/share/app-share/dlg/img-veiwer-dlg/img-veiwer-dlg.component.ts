import { Component, OnInit, Inject, Input } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FileResource } from 'src/app/models/base/file-resource';
import { fadeIn } from 'src/app/share/animations/fade-in.animation';

@Component({
  selector: 'app-img-veiwer-dlg',
  templateUrl: './img-veiwer-dlg.component.html',
  animations: [fadeIn,],
})
export class ImgVeiwerDlgComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ImgVeiwerDlgComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {
      fileResource: FileResource,
    },
  ) { 
  }

  ngOnInit(): void {
  }

  onClickClose() {
    this.dialogRef.close();
  }

}
