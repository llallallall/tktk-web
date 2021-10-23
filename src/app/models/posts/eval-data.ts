
import { UserModel } from '../users/user-model';
import { BaseModel, Attr } from './../base/base-model';
import { PostModel } from './post.model';

export class EvalData extends BaseModel {


    ///////////////////////////////////////////////////

    @Attr checkedLike: string;
    @Attr cntLike: number;
    @Attr cntDislike: number;
    @Attr ratable: boolean;
    @Attr reportIdx: string;

    ///////////////////////////////////////////////////


    ///////////////////////////////////////////////////



}
