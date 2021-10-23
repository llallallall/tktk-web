import { Injectable } from '@angular/core';
import * as _ from 'lodash';
import { QuestionClassModel } from '../models/cs/question-class.model';
import { ApiService } from './api.service';


@Injectable({
  providedIn: 'root'
})
export class CsService {

  qclassList: QuestionClassModel[] = [];

  constructor(
    public _api: ApiService,
  ) {
    // }
    // console.log('ftag', 'menus=', this.menus);
  }

  async load_qclass_list_ifNeed() {
    const ftag = `load_qclass_list_ifNeed(),`;
    try {
      if (this.qclassList.length === 0) {
        await this.load_qclass_list();
      }
    } catch (err) {
      console.log(ftag, 'err=', err);
    }
  }

  async load_qclass_list() {
    const ftag = `load_qclass_list(),`;
    try {
      const res = await this._api.reqQnaCmd('qna_qclass_list');
      console.log(ftag, 'res=', res);
      if (res.result) {
        this.qclassList = [];
        for (const item of res.result) {
          const m = new QuestionClassModel(item);
          this.qclassList.push(m);
        }
      }
    } catch (err) {
      console.log(ftag, 'err=', err);
    }
  }

  getAnswer(questionClassIdx: string): string {
    for (const item of this.qclassList) {
      if (item.objectId == questionClassIdx) {
        return item.answer;
      }
    }
  }

} // end of class
