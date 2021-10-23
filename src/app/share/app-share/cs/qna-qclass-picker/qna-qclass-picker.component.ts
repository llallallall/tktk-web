import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { fadeIn } from 'src/app/share/animations/fade-in.animation';
import { CategoryModel } from 'src/app/models/communities/category.model';
import { CategoryService } from 'src/app/service/category.service';
import { ApiService } from 'src/app/service/api.service';
import { SiteModel } from 'src/app/models/site/site.model';
import { QuestionClassModel } from 'src/app/models/cs/question-class.model';

@Component({
  selector: 'app-qna-qclass-picker',
  templateUrl: './qna-qclass-picker.component.html',
  animations: [fadeIn,],
})
export class QnaQclassPickerComponent implements OnInit {

  @Input() code: string; //categoryIdx;
  @Input() disabled = false;
  @Input() pickerMode = true;
  @Output() on_changed = new EventEmitter();

  items: QuestionClassModel[];
  isLoading = true;

  constructor(
    private _api: ApiService,
  ) { }

  ngOnInit(): void {
    const ftag = `ngOnInit(),`;
    // console.log(ftag, 'siteModel=', this.siteModel);
    // console.log(ftag, 'items=', this.items);
    this.loadItems();
  }


  onModelChange(arg) {
    const ftag = `onModelChange(${arg}),`;
    // console.log(ftag);    
    this.on_changed.emit(arg);
  }

  async loadItems() {
    const ftag = `loadItems(),`;
    try {
      this.isLoading = true;
      const res = await this._api.reqQnaCmd('qna_qclass_list');
      this.isLoading = false;
      console.log(ftag, 'res=', res);
      if (res.result) {
        this.items = [];
        for (const item of res.result) {
          const m = new QuestionClassModel(item);
          this.items.push(m);
        }
      }
    } catch (err) {
      this.isLoading = false;
      console.log(ftag, 'err=', err);
    }
  }

}
