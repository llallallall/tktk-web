import { BaseModel, Attr } from './../base/base-model';


export class EvaluateModel extends BaseModel {

    static readonly ModelName = 'EvaluateModel';

    static readonly Target = {
        post: 'post',
        comment: 'comment',
    };

    ///////////////////////////////////////////////////

    @Attr targetType?: string;
    @Attr targetIdx?: string;
    @Attr daykey?: number;
    @Attr contentIdx?: string; // postIdx
    @Attr categoryIdx?: string;
    @Attr galleryIdx?: string;
    @Attr checkedLike?: string;

    ///////////////////////////////////////////////////


}
