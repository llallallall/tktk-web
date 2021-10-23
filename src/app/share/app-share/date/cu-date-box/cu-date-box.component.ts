import { Component, Input, OnInit, Output, SimpleChanges, EventEmitter, ElementRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { fadeIn } from 'src/app/share/animations/fade-in.animation';
import DateUtil from 'src/app/utils/date-util';
import { CuDateDlgComponent } from '../cu-date-dlg/cu-date-dlg.component';

@Component({
  selector: 'app-cu-date-box',
  templateUrl: './cu-date-box.component.html',
  styleUrls: ['./cu-date-box.component.scss',],
  animations: [fadeIn,],
})
export class CuDateBoxComponent implements OnInit {

  @Input() date: Date;
  @Output() on_changed = new EventEmitter();
  @Input() dateStart: Date = new Date();
  @Input() dateEnd: Date;

  constructor(
    private _dlg: MatDialog,
  ) {
  }

  ngOnInit(): void {
    const ftag = `ngOnInit(),`;
    
    if (!this.dateEnd) {
      this.dateEnd = DateUtil.getNextDay(365 * 2, this.dateStart).toDate();
    }
  }

  onClickBox($event: MouseEvent) {
    const ftag = `onClickBox(),`;

    const target = new ElementRef($event.currentTarget);
    const dialogRef = this._dlg.open(CuDateDlgComponent, {
      width: '320px',
      data: {
        trigger: target,
        dateStart: this.dateStart,
        dateEnd: this.dateEnd,
      },
      autoFocus: false,
      // panelClass: 'custom-dialog-container',
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(ftag, 'result=', result);
      if (result) {
        // result.dateClass = this.code;
        this.on_changed.emit(result);
      }
    });
  }

}
