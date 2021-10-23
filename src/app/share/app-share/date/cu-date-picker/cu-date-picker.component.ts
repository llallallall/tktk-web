import { Component, Input, OnInit, Output, SimpleChanges, EventEmitter } from '@angular/core';
import { fadeIn } from 'src/app/share/animations/fade-in.animation';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { Moment } from 'moment';

class NaviDateAdapter extends MomentDateAdapter {
  getFirstDayOfWeek() {
    return 1;
  }
};

const MY_FORMATS = {
  parse: {
    dateInput: 'LL',
  },
  display: {
    dateInput: 'LL',
    // monthYearLabel: 'MMM YYYY',
    monthYearLabel: 'MMM',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-cu-date-picker',
  templateUrl: './cu-date-picker.component.html',
  animations: [fadeIn,],
  providers: [
    { provide: DateAdapter, useClass: NaviDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
})
export class CuDatePickerComponent implements OnInit {

  @Input() dateType: string;
  @Input() dateStart: Date;
  @Input() dateEnd: Date;

  @Output() on_changed = new EventEmitter();
  @Output() on_cancel = new EventEmitter();

  // minDate = new Date(2018, 0, 1);
  // maxDate = new Date(2021, 2, 19);
  today = new Date();

  _date: Date;
  newDate: Date;

  constructor() {
  }

  ngOnInit(): void {
    const ftag = `ngOnInit(),`;
    // console.log(ftag, 'dateEnd=', this.dateEnd);   
    this.dateType =  this.dateType || 'dateFrom';
    // console.log(ftag, 'dateType=', this.dateType);
    // console.log(ftag, 'max=', this.max);
  }

  ngOnChanges(changes: SimpleChanges) {
    const ftag = `ngOnChanges(),`;
    // console.log(ftag, 'changes=', changes);
  }

  getName(item: any) {
    const ftag = `getName(${item.code}),`;
    return item.name;
  }

  onModelChange(arg) {
    const ftag = `onModelChange(${arg}),`;
    console.log(ftag);
    this.on_changed.emit(arg);
  }

  onSelectionChanged(arg: Moment) {
    const ftag = `onSelectionChanged(),`;
    // console.log(ftag, 'arg=', arg);
    this.newDate = arg.toDate();
    console.log(ftag, 'arg=', arg);
    // this.on_changed.emit(arg.toDate());
  }

  onClickCancel() {
    this.on_cancel.emit();
  }

  onClickSubmit() {
    if (!this.newDate) {
      return;
    }
    if (this.isTypeStart) {
      this.dateStart = this.newDate;
    } else {
      this.dateEnd = this.newDate;
    }
    this.on_changed.emit({
      dateType: this.dateType,
      dateStart: this.dateStart,
      dateEnd: this.dateEnd,
      date: this.newDate,
    });
  }

  get isTypeStart(): boolean {
    return this.dateType === 'dateFrom';
  }

  get date(): Date {
    if (!this._date) {
      if (this.isTypeStart) {
        this._date = this.dateStart;
      } else {
        this._date = this.dateEnd;
      }
    }
    return this._date;
  }

  set date(value: Date) {
    this._date = value;
  }

  get max(): Date {
    if (this.isTypeStart) {
      return this.dateEnd;
    }
    return this.today;
  }

  get min(): Date {
    return this.dateStart;
  }


}
