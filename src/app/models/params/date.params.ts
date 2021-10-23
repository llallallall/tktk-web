import DateUtil from "src/app/utils/date-util";


export class DateParams {

    // startAt: Date;
    selectedDate: Date = new Date();
    minDate: Date;
    maxDate: Date;

    constructor(
        public key: string,
    ) {

    }

    get daykey(): number {
        return DateUtil.getDayKey(this.selectedDate);
    }

    set daykey(v: number) {
        this.selectedDate = DateUtil.dayKey2Date(v);
    }

}