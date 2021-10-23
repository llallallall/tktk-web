import { Component, ElementRef, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Cd } from 'src/app/models/codes/cd';
import { OtoqParam } from 'src/app/models/cs/otoq.param';
import { DateParams } from 'src/app/models/params/date.params';
import QueryParams from 'src/app/models/params/query.params';
import { fadeIn } from 'src/app/share/animations/fade-in.animation';
import DateUtil from 'src/app/utils/date-util';

@Component({
  selector: 'app-oto-list-filter',
  templateUrl: './oto-list-filter.component.html',
  animations: [fadeIn,],
})
export class OtoListFilterComponent implements OnInit {

  isLoading = false;

  @Input() qp: OtoqParam;
  @Output() on_changed = new EventEmitter();
  itemsSearch = [
    {
      code: 'title',
      name: '제목',
    },
    {
      code: 'qclass',
      name: '질문유형',
    },
    {
      code: 'nickname',
      name: '닉네임',
    },
  ];

  constructor(
    private _dlg: MatDialog,
  ) { }

  ngOnInit(): void {
    const ftag = `ngOnInit(),`;
    this.qp.searchKey = this.qp.searchKey || 'title';
    // this.qp.updateDateParams();
    // console.log(ftag, 'dpStart=', this.qp.dpStart);

    // console.log(ftag, 'qp=', this.qp.getAttrs());
  }



  onClickSearch() {

    // if (this.qp.searchKey !== Cd.All) {
    // } else {
    //   this.qp.searchWord = null;
    // }
    this.on_changed.emit(this.qp);
    // if (this.qp)
  }

  onClickClear() {
    this.qp.clearQp();
    this.on_changed.emit(this.qp);
  }

  on_changed_searchKey($event) {
    const ftag = `on_changed_searchKey(),`;
    console.log(ftag, '$event=', $event);
    this.qp.searchKey = $event;
    this.qp.searchWord = null;
    this.on_changed.emit(this.qp);

    // this.qp.searchKey = $event;
    // if (this.qp.searchKey === Cd.All) {
    //   this.qp.searchWord = null;
    // }
    // this.qp.set('searchKey', $event);
  }





}
