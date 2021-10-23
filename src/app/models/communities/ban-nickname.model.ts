import * as _ from 'lodash';
import { BaseModel, Attr } from './../base/base-model';


export class BanNicknameModel extends BaseModel {

    static readonly ModelName = 'BanNicknameModel';


    @Attr names?: string;

    //////////////////////////////////////////


    //////////////////////////////////////////

    get items(): string[] {
        if (this.names) {
            const list = this.names.split(',');
            const ret = [];
            for (const item of list) {
                const bn = _.trim(item);
                if (bn) {
                    ret.push(bn);
                }
            }
            return _.uniq(ret);
        }
        return [];
    }


    //////////////////////////////////////////

    //////////////////////////////////////////





} // end of class
