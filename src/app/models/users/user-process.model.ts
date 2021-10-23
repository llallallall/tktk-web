import { BaseModel, Attr } from './../base/base-model';

export class UserProcessModel extends BaseModel {

    static readonly ModelName = 'UserProcessModel';

    static readonly Type = {
        dormant_release: 'dormant_release',
        change_pw: 'change_pw',
    }

    static readonly St = {
        none: 'none',
        canceled: 'canceled',
        wait_mail_accept: 'wait_mail_accept',
        done: 'done',
    }


    @Attr type: string;
    @Attr userIdx: string;
    @Attr email: string;
    @Attr startTs: number;
    @Attr endTs: number;
    @Attr expireTs?: number;
    @Attr state?: string;
    @Attr mailResult?: any;

    //////////////////////////////////////////


    //////////////////////////////////////////

    //////////////////////////////////////////



} // end of class
