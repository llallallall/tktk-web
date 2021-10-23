import { BaseModel } from '../models/base/base-model';
import * as _ from 'lodash';
// import * as momentTz from 'moment-timezone';
import * as moment from 'moment';

export default class DateUtil {

    static readonly DefaultTz = 'Asia/Seoul';

    // static subtract(amount: number, unit: momentTz.DurationInputArg2, date = new Date()): momentTz.Moment {
    //     return momentTz.tz(date, DateUtil.DefaultTz).subtract(amount, unit);
    // }

    static getPreviousDay(dayCnt = 1, date = new Date()): moment.Moment {
        return moment(date, DateUtil.DefaultTz).subtract(dayCnt, 'days');
    }

    static getNextDay(dayCnt = 1, date = new Date()): moment.Moment {
        return moment(date, DateUtil.DefaultTz).add(dayCnt, 'days');
    }

    static makeDate(data: any): Date {
        if (!data) {
            return null;
        }
        return new Date(data.year, data.monthValue - 1, data.dayOfMonth, data.hour, data.minute, data.second);
    }

    static getMoment(date = new Date()): moment.Moment {
        return moment(date, DateUtil.DefaultTz);
    }

    static isSameDay(d1: Date, d2: Date): boolean {
        const d11 = DateUtil.getMoment(d1);
        const d22 = DateUtil.getMoment(d2);
        const n1 = Number(d11.format('YYYYMMDD'));
        const n2 = Number(d22.format('YYYYMMDD'));
        if (n1 === n2) {
            return true;
        }
        return false;
    }

    static getDayKey(date = new Date()): number {
        return Number(DateUtil.getMoment(date).format('YYYYMMDD'));
    }

    static getMonthKey(date = new Date()): string {
        return DateUtil.getMoment(date).format('YYYYMM');
    }

    static isToday(date: Date): boolean {
        return DateUtil.isSameDay(new Date(), date);
    }

    static getYesterday(date = new Date()): moment.Moment {
        return moment(date, DateUtil.DefaultTz).subtract(1, 'days');
    }

    static getTomorrow(date = new Date()): moment.Moment {
        return moment(date, DateUtil.DefaultTz).add(1, 'days');
    }

    static getDayDate(date = new Date()): Date {
        const p = this.getDateParams(date);
        return new Date(p.year, p.month - 1, p.day);
    }

    static getDayStartTs(date = new Date()): number {
        const dk = DateUtil.getDayKey(date);
        const d = DateUtil.dayKey2Date(dk);
        return d.getTime();
    }

    static getDayEnd(date = new Date()): Date {
        const td = DateUtil.getDayDate(DateUtil.getTomorrow(date).toDate());
        return DateUtil.getMoment(td).add(-1, 'second').toDate();
    }

    static getDayEndTs(date = new Date()): number {
        const dk = DateUtil.getDayKey(date);
        let d = DateUtil.dayKey2Date(dk);
        d = DateUtil.getNextDay(1, d).subtract(1, 'millisecond').toDate();
        return d.getTime();
    }

    static getDateParams(date = new Date()): any {
        const m = moment(date, DateUtil.DefaultTz);
        return {
            year: Number(m.format('YYYY')),
            month: Number(m.format('MM')),
            day: Number(m.format('DD')),
            dayKey: Number(`${m.format('YYYY')}${m.format('MM')}${m.format('DD')}`),
            monthKey: Number(`${m.format('YYYY')}${m.format('MM')}`),
        };
    }

    static isAm(date = new Date()): boolean {
        const m = DateUtil.getMoment(date);
        if (m.hour() >= 12) {
            return false;
        }
        return true;
    }

    static diffDay(date1: Date, date2: Date): number {
        return DateUtil.getMoment(date1).diff(DateUtil.getMoment(date2), 'days');
    }

    static diffHour(date1: Date, date2: Date): number {
        return DateUtil.getMoment(date1).diff(DateUtil.getMoment(date2), 'hours');
    }

    static diffMinute(date1: Date, date2: Date): number {
        return DateUtil.getMoment(date1).diff(DateUtil.getMoment(date2), 'minutes');
    }


    static dayKey2Date(dayKey: number): Date {
        const ftag = `dayKey2Date(${dayKey}),`;
        const dk = `${dayKey}`;
        const yy = Number(dk.substring(0, 4));
        const mm = Number(dk.substring(4, 6));
        const dd = Number(dk.substring(6, 8));
        // console.log(ftag, 'mm=', mm, yy);
        return new Date(yy, mm - 1, dd);
    }

    static getMonday(date = new Date()): Date {
        const d = DateUtil.getMoment(date).toDate();
        const day = d.getDay();
        const diff = d.getDate() - day + (day === 0 ? -6 : 1);
        const mond = new Date(d.setDate(diff));
        return DateUtil.getDayDate(mond);
    }

    static getWeekEnd(date = new Date()): Date {
        const ftag = `getWeekEnd(${date}),`;
        const dd = DateUtil.getMoment(date).add(1, 'week').add(-1, 'seconds').toDate();
        // console.log(ftag, 'dd=', dd);
        return dd;
    }

    static getWeekOfMonth(date: Date): number {
        const ftag = `getWeekOfMonth(${date}),`;
        var firstWeekday = new Date(date.getFullYear(), date.getMonth(), 1).getDay();
        var offsetDate = date.getDate() + firstWeekday - 1;
        return Math.floor(offsetDate / 7);
    }

    static format(date: Date | moment.Moment, fmt = 'YYYYMMDD'): string {
        const ftag = `format(),`;
        try {
            if (moment.isMoment(date)) {
                return date.format(fmt);
            }
            if (date instanceof Date) {
                return DateUtil.getMoment(date).format(fmt);
            }
        } catch (err) {
            console.log(ftag, 'err=', err);
            throw err;
        }
    }

    static getWeekName(wod: number): string {
        return `w${wod}`;
    }

    static endOfMonth(date: Date = new Date()): Date {
        const d = DateUtil.getMoment(date).add(1, 'months').add(-1, 'days').toDate();
        return d;
    }

    static getDaykeys(args: { monthkey?: string, weekDate?: Date }): number[] {
        if (args.monthkey) {
            const startDk = Number(args.monthkey + '01');
            const startDate = DateUtil.dayKey2Date(startDk);
            const endDate = DateUtil.endOfMonth(startDate);
            const daykeyStart = DateUtil.getDayKey(startDate);
            const daykeyEnd = DateUtil.getDayKey(endDate);
            return [daykeyStart, daykeyEnd];
        }
        else if (args.weekDate) {
            const ds = DateUtil.getMonday(args.weekDate);
            const daykeyStart = DateUtil.getDayKey(ds);
            const de = DateUtil.getNextDay(6, ds).toDate();
            const daykeyEnd = DateUtil.getDayKey(de);
            return [daykeyStart, daykeyEnd];
        }
    }

    //만나이
    static getAge(birthday: string): number {
        if (!birthday) {
            return 0;
        }
        const date = DateUtil.dayKey2Date(Number(birthday));
        // let text = DateUtil.format(date, `YYYY년 M월 D일`);
        // let age = (new Date()).getFullYear() - date.getFullYear() + 1;
        let age = (new Date()).getFullYear() - date.getFullYear() - 1;
        const td = Number(DateUtil.format(new Date(), 'MMDD'));
        const bd = Number(birthday.substring(4, 8));
        if (td >= bd) {
            age++;
        }
        return age;
    }

} // end of class
