import { Component, Input, OnInit } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-pdf-link',
  templateUrl: './pdf-link.component.html',
  styles: [
  ]
})
export class PdfLinkComponent implements OnInit {

  @Input() title;
  @Input() pageNo = 0;

  constructor(
    private _api: ApiService,
  ) { }

  ngOnInit(): void {
  }

  onClickBtn() {

    // const url = this._api.router.serializeUrl(
    //   this._api.router.createUrlTree([`/${this._api.siteId}/p/pdf`], {
    //     queryParams: {
    //       title: this.title,
    //       pageNo: this.pageNo,
    //     }
    //   })
    // );

    // console.log(ftag, 'url=', url);
    let url = `https://tktk.crazyupinc.com/${this._api.siteId}/p/pdf?pageNo=${this.pageNo}`;
    if (this.title) {
      url += `&title=${this.title}`;
    }
    window.open(url, '_blank');

    // this._api.navigate('/p/pdf', {
    //   queryParams: {
    //     title: this.title,
    //     pageNo: this.pageNo,
    //   }
    // });
  }

}
