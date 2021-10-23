import { Component, Input, OnInit } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-pdf-view',
  templateUrl: './pdf-view.component.html',
  styles: [
  ]
})
export class PdfViewComponent implements OnInit {

  @Input() title = '기획';
  @Input() pageNo = 0;

  constructor(
    private _api: ApiService,
  ) { }

  ngOnInit(): void {
  }

  onClickPdf() {
    const ftag = `onClickPdf(),`;

    // const path = `${this._api.siteId}/p/pdf?pageNo=${this.pageNo}&title=${this.title}`;
    // const url = this._api.router.serializeUrl(
    //   this._api.router.createUrlTree([`/${this._api.siteId}/p/pdf`], {
    //     queryParams: {
    //       title: this.title,
    //       pageNo: this.pageNo,
    //     }
    //   })
    // );

    // console.log(ftag, 'url=', url);
    const url = `https://tktk.crazyupinc.com/${this._api.siteId}/p/pdf?title=${this.title}&pageNo=${this.pageNo}`;
    window.open(url, '_blank');
  }

}
