import { Component, OnInit, Inject, ElementRef, ViewChild } from '@angular/core';
import { MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import Editor from '@toast-ui/editor';
import { ApiService } from 'src/app/service/api.service';
import { fadeIn } from 'src/app/share/animations/fade-in.animation';


@Component({
  selector: 'app-ed-media-input-dlg',
  templateUrl: './ed-media-input-dlg.component.html',
  animations: [fadeIn,],
})
export class EdMediaInputDlgComponent implements OnInit {

  @ViewChild('dlg_container') dlg_container: ElementRef;

  constructor(
    public dialogRef: MatDialogRef<EdMediaInputDlgComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {
      trigger: ElementRef,
      // model: PostModel,
      editor: Editor,
      fileClass: string,
      resourceIdx: string,
    },
    private _snackBar: MatSnackBar,
    private api: ApiService,
    private el: ElementRef,
  ) { }

  ngOnInit(): void {
    const ftag = `(),`;
    // console.log(ftag, 'items=', this.items);

    // console.log(ftag, 'me=', this.api.me);
  }

  ngAfterViewInit() {
    const ftag = `ngAfterViewInit(),`;
    // console.log(ftag, 'dlg_container=', this.dlg_container.nativeElement.offsetHeight);
    // console.log(ftag, 'offsetHeight=', this.el.nativeElement.offsetHeight, this.el);

    const trigger: ElementRef = this.data.trigger;
    const rect = trigger.nativeElement.getBoundingClientRect();
    // console.log(ftag, 'dlg_container=', this.dlg_container);
    // console.log(ftag, 'offsetHeight=', this.dlg_container.nativeElement.offsetHeight);
    // console.log(ftag, 'rect=', rect);
    // console.log(ftag, 'innerHeight=', window.innerHeight);
    const maxBt = Math.max(window.innerHeight - this.dlg_container.nativeElement.offsetHeight - 15, this.dlg_container.nativeElement.offsetHeight);
    const bottom = Math.min(maxBt - 120, rect.bottom + 5);
    // console.log(ftag, 'maxBt=', maxBt, rect.bottom, bottom);
    const matDialogConfig: MatDialogConfig = new MatDialogConfig();
    matDialogConfig.position = { left: `${rect.left - 24}px`, top: `${bottom}px` };
    this.dialogRef.updatePosition(matDialogConfig.position);

  }

  onChangedMedia($event) {
    const ftag = `onChangedMedia(),`;
    this.dialogRef.close($event);
  }


}
