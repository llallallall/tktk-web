import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';
import { fadeIn } from 'src/app/share/animations/fade-in.animation';

@Component({
  selector: 'app-global-search-box',
  templateUrl: './global-search-box.component.html',
  animations: [fadeIn,],
})
export class GlobalSearchBoxComponent implements OnInit {

  searchWord: string;

  constructor(
    private _api: ApiService,
  ) { }

  ngOnInit(): void {
  }

  onClickSearch() {
    if (!this.searchWord) {
      return;
    }
    this._api.navigate('/p/h/search', {
      queryParams: {
        searchWord: this.searchWord,
      },
    });
    // this._api.routeThis(this.qp);
  }

}
