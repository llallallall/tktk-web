import DateUtil from 'src/app/utils/date-util';
import { Cd } from '../codes/cd';
import { CategoryModel } from '../communities/category.model';
import { DateParams } from '../params/date.params';
import QueryParams from '../params/query.params';
import { BaseModel, Attr } from './../base/base-model';

export class CommentParam extends QueryParams {

    @Attr searchKey: string;
    @Attr targetType: string;
    @Attr targetIdx: string;
    @Attr contentType: string;
    @Attr display: string;

    @Attr sr_main: string;


    //////////////////////////////////////////

    constructor(public attrs: any = null) {
        super(attrs);
    }


    //////////////////////////////////////////
    initQp() {
        const ftag = `initQp(),`;

        this.pageSize = this.pageSize || 30;
    }

    //////////////////////////////////////////

    clearQp() {
        this.searchKey = Cd.All;
    }


    //////////////////////////////////////////

} // end of class
