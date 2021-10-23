import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import QueryParams from 'src/app/models/params/query.params';
import { ApiService } from 'src/app/service/api.service';


@Component({
  selector: 'app-cu-pdf',
  templateUrl: './cu-pdf.component.html',
  styles: [
  ]
})
export class CuPdfComponent implements OnInit {

  qp = new QueryParams();

  constructor(
    private _api: ApiService,
    private _aRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    const ftag = `  ngOnInit(),`;
    console.log(ftag,);
    this.parseParams();
  }

  routeThis() {
    const path = this._api.config.currentUrl;
    this._api.config.router.navigate([path], {
      queryParams: this.qp.getAttrs(),
      replaceUrl: true,
    });
  }

  parseParams() {
    const ftag = `parseParams()`;
    this._aRoute.queryParams.subscribe((querys) => {
      console.log(ftag, 'querys=', querys);
      // querys.title = querys.title || 'pdf';
      this.qp = new QueryParams(querys);
    });
  }

  get title(): string {
    return this.qp.get('title') || 'PDF';
  }

  get pageNo(): number {
    return Number(this.qp.get('pageNo') || 0);
  }

  set pageNo(v: number) {
    this.qp.set('pageNo', v);
  }

  onClickBack() {
    this._api.goBack();
  }

  onClickNav(isPre: boolean) {
    if (isPre) {
      this.pageNo = Math.max(this.pageNo - 1, 0);
    } else {
      this.pageNo = this.pageNo + 1;
    }
    this.routeThis();
  }

}
