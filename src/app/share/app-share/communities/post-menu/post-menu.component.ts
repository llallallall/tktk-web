import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Cd } from 'src/app/models/codes/cd';
import { ApiService } from 'src/app/service/api.service';
import DlgUtil from 'src/app/utils/dlg.util';

@Component({
  selector: 'app-post-menu',
  templateUrl: './post-menu.component.html',
  styles: [
  ]
})
export class PostMenuComponent implements OnInit {

  @Input() code: string;
  @Output() on_changed = new EventEmitter();
  @Output() on_click_edit = new EventEmitter();

  constructor(
    private _api: ApiService,
    private _dlg: MatDialog,
  ) { }

  ngOnInit(): void {
  }

  onClickEdit() {
    // https://tktk.crazyupinc.com:1295/theenm/p/pdf?pageNo=49
    if (this._api.me.sanctioned === Cd.YN.Y) {
      DlgUtil.showConfirm(this._dlg, {
        title: `제재 상태입니다.`,
        okBtnColor: 'primary',
        showCancel: Cd.YN.N,
      });      
      return;
    }
    this.on_click_edit.emit();
  }

}
