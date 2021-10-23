import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';
import { fadeIn } from 'src/app/share/animations/fade-in.animation';

@Component({
  selector: 'app-page-title-back',
  templateUrl: './page-title-back.component.html',
  animations: [fadeIn,],
})
export class PageTitleBackComponent implements OnInit {

  @Input() isLoading = false;
  @Input() hasBack = true;
  @Input() useDefaultBack = true;
  @Output() on_click_back = new EventEmitter();

  constructor(
    private _api: ApiService,
  ) {
  }

  ngOnInit(): void {
  }

  onClickBack($event: MouseEvent) {
    if (this.useDefaultBack) {
      this._api.goBack();
    }
    this.on_click_back.emit($event);
  }

}
