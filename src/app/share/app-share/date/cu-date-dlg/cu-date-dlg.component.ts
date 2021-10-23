import { Component, OnInit, Inject, ElementRef, ViewChild } from '@angular/core';
import { MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { fadeIn } from 'src/app/share/animations/fade-in.animation';

@Component({
  selector: 'app-cu-date-dlg',
  templateUrl: './cu-date-dlg.component.html',
  animations: [fadeIn,],
})
export class CuDateDlgComponent implements OnInit {

  @ViewChild('dlg_container') dlg_container: ElementRef;

  constructor(
    public dialogRef: MatDialogRef<CuDateDlgComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit(): void {
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
    matDialogConfig.position = { left: `${rect.left - 1}px`, top: `${bottom}px` };
    this.dialogRef.updatePosition(matDialogConfig.position);

  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onCancel() {
    this.dialogRef.close();
  }

  get dateType(): string {
    return this.data.dateType;
  }

  get dateStart(): Date {
    return this.data.dateStart;
  }

  get dateEnd(): Date {
    return this.data.dateEnd;
  }

  onChanged($event) {
    const ftag = `onChanged(${this.dateType}),`;
    console.log(ftag, '$event=', $event);
    this.dialogRef.close($event);
  }


}
