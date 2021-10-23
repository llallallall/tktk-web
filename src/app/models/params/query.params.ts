

import * as _ from 'lodash';
import { BaseModel, Attr } from '../base/base-model';

export default class QueryParams extends BaseModel {

    static readonly DefaultSize = 30;

    static readonly SortOrder = {
        asce: 'asce',
        desc: 'desc',
    };

    @Attr pageNo?: number;
    @Attr pageSize?: number;
    @Attr totalCount?: number;
    @Attr sort_key?: string;
    @Attr sort_order?: string;
    @Attr searchWord?: string;
    @Attr modelName?: string;

    @Attr order_desc?: string;
    @Attr order_asce?: string;

    constructor(attrs: any = {}) {
        super(_.clone(attrs));
        this.pageNo = Number(this.pageNo || 0);
        if (this.pageNo < 0) {
            this.pageNo = 0;
        }
        this.pageSize = Number(this.pageSize || QueryParams.DefaultSize);
        this.totalCount = Number(this.totalCount || 0);
        // this.searchWord = this.searchWord;
        // if (this.searchWord) {
        //     this.searchWord = _.trim(this.searchWord);
        // }
    }

    get hasOrder(): boolean {
        if (this.order_asce || this.order_desc) {
            return true;
        }
        return false;
    }

    get qpBody(): any {
        return {
            queryParams: this.getAttrs(),
        };
    }

    setOrder(type: string, key: string) {
        this.unset('order_desc');
        this.unset('order_asce');
        this.set(type, key);
    }

} // end of class
