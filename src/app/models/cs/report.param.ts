import DateUtil from 'src/app/utils/date-util';
import { Cd } from '../codes/cd';
import { CategoryModel } from '../communities/category.model';
import { DateParams } from '../params/date.params';
import QueryParams from '../params/query.params';
import { BaseModel, Attr } from './../base/base-model';

export class ReportParam extends QueryParams {

    @Attr searchKey: string;

    @Attr targetType: string;

    @Attr categoryIdx: string;
    @Attr galleryIdx: string;

    @Attr createdDkEnd: number;
    @Attr createdDkStart: number;

    //////////////////////////////////////////

    dpStart = new DateParams('createdDkStart');
    dpEnd = new DateParams('createdDkEnd');

    categoryModel: CategoryModel;

    //////////////////////////////////////////

    constructor(public attrs: any = null) {
        super(attrs);
        if (this.createdDkEnd) {
            this.createdDkEnd = Number(this.createdDkEnd);
            this.dpEnd.daykey = this.createdDkEnd;
        }
        if (this.createdDkStart) {
            this.createdDkStart = Number(this.createdDkStart);
            this.dpStart.daykey = this.createdDkStart;
        }
    }


    //////////////////////////////////////////
    initQp() {
        const ftag = `initQp(),`;

        this.pageSize = this.pageSize || 10;
        this.targetType = this.targetType || Cd.All;
        this.categoryIdx = this.categoryIdx || Cd.All;
        this.galleryIdx = this.galleryIdx || Cd.All;
        if (!this.hasOrder) {
            this.order_desc = 'createdTs';
        }
        // console.log(ftag, 'qp=', this.qp.getAttrs());
        // console.log(ftag, 'dkEnd=', dkEnd);
        if (!this.createdDkEnd) {
            const ed = new Date();
            const sd = DateUtil.getPreviousDay(7, ed).toDate();
            this.createdDkEnd = DateUtil.getDayKey(ed);
            if (!this.createdDkStart) {
                this.createdDkStart = DateUtil.getDayKey(sd);
            }
            //   this.qp.set('createdDkEnd', dkEnd);
        }
        this.dpStart.daykey = this.createdDkStart;
        this.dpEnd.daykey = this.createdDkEnd;
        // console.log(ftag, 'attrs=', this.getAttrs());
        console.log(ftag, 'dpStart=', this.dpStart);
    }

    //////////////////////////////////////////

    clearQp() {
        this.searchKey = Cd.All;
        this.searchWord = null;
        this.categoryIdx = Cd.All;
        this.galleryIdx = Cd.All;
        this.targetType = Cd.All;

        this.dpEnd.selectedDate = new Date();
        this.dpStart.selectedDate = DateUtil.getPreviousDay(7, this.dpEnd.selectedDate).toDate();
        this.createdDkStart = this.dpStart.daykey;
        this.createdDkEnd = this.dpEnd.daykey;
        this.setMinMaxDate();
    }

    updateDateParams() {
        const ftag = `updateDateParams(),`;

        this.dpStart.daykey = Number(this.createdDkStart);
        // console.log(ftag, 'dpStart=', this.dpStart);
        this.dpEnd.daykey = Number(this.createdDkEnd);
        this.setMinMaxDate();
    }

    setMinMaxDate() {
        const ftag = `setMinMaxDate(),`;

        this.dpStart.maxDate = this.dpEnd.selectedDate;
        this.dpEnd.minDate = this.dpStart.selectedDate;

    }

    //////////////////////////////////////////

} // end of class
