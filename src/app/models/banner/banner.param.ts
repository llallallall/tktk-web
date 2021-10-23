import DateUtil from 'src/app/utils/date-util';
import { Cd } from '../codes/cd';
import { CategoryModel } from '../communities/category.model';
import { DateParams } from '../params/date.params';
import QueryParams from '../params/query.params';
import { BaseModel, Attr } from './../base/base-model';

export class BannerParam extends QueryParams {

    @Attr searchKey: string;
    @Attr display: string;


    //////////////////////////////////////////


    //////////////////////////////////////////

    constructor(public attrs: any = null) {
        super(attrs);
    }


    //////////////////////////////////////////
    initQp() {
        const ftag = `initQp(),`;

        this.pageSize = this.pageSize || 30;
        if (!this.hasOrder) {
            this.order_desc = 'createdTs';
        }
        // console.log(ftag, 'qp=', this.qp.getAttrs());
        // console.log(ftag, 'dkEnd=', dkEnd);
    }

    //////////////////////////////////////////

    clearQp() {
        this.searchKey = Cd.All;
        this.searchWord = null;
    }


    //////////////////////////////////////////

} // end of class
