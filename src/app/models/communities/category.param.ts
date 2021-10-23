import DateUtil from 'src/app/utils/date-util';
import { Cd } from '../codes/cd';
import { DateParams } from '../params/date.params';
import QueryParams from '../params/query.params';
import { BaseModel, Attr } from './../base/base-model';


export class CategoryParam extends QueryParams {

    static readonly DefaultDurationDay = 30;

    @Attr display: string;
    @Attr searchKey: string;


    //////////////////////////////////////////

    constructor(public attrs: any = null) {
        super(attrs);
        this.display = this.display || Cd.YN.N;
   }

    //////////////////////////////////////////
    initQp() {
        const ftag = `initQp(),`;

        this.pageSize = this.pageSize || 30;
        this.display = this.display || Cd.All;
        // console.log(ftag, 'qp=', this.qp.getAttrs());
        // console.log(ftag, 'dkEnd=', dkEnd);
        // if (!this.createdDkEnd) {
        //     const ed = new Date();
        //     const sd = DateUtil.getPreviousDay(CategoryParam.DefaultDurationDay, ed).toDate();
        //     this.createdDkEnd = DateUtil.getDayKey(ed);
        //     if (!this.createdDkStart) {
        //         this.createdDkStart = DateUtil.getDayKey(sd);
        //     }
        //     //   this.qp.set('createdDkEnd', dkEnd);
        // }
        // this.dpStart.daykey = this.createdDkStart;
        // this.dpEnd.daykey = this.createdDkEnd;
        // // console.log(ftag, 'attrs=', this.getAttrs());
        // console.log(ftag, 'dpStart=', this.dpStart);
    }

    //////////////////////////////////////////

    clearQp() {
        this.searchKey = Cd.All;
        this.searchWord = null;
        this.display = Cd.All;

        // this.dpEnd.selectedDate = new Date();
        // this.dpStart.selectedDate = DateUtil.getPreviousDay(CategoryParam.DefaultDurationDay, this.dpEnd.selectedDate).toDate();
        // this.createdDkStart = this.dpStart.daykey;
        // this.createdDkEnd = this.dpEnd.daykey;
        // this.setMinMaxDate();
    }

    // updateDateParams() {
    //     const ftag = `updateDateParams(),`;

    //     this.dpStart.daykey = Number(this.createdDkStart);
    //     // console.log(ftag, 'dpStart=', this.dpStart);
    //     this.dpEnd.daykey = Number(this.createdDkEnd);
    //     this.setMinMaxDate();
    // }

    // setMinMaxDate() {
    //     const ftag = `setMinMaxDate(),`;

    //     this.dpStart.maxDate = this.dpEnd.selectedDate;
    //     this.dpEnd.minDate = this.dpStart.selectedDate;

    // }


    //////////////////////////////////////////

} // end of class
