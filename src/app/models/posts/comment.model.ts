
import { Cd } from '../codes/cd';
import { ReportModel } from '../cs/report.model';
import { UserModel } from '../users/user-model';
import { BaseModel, Attr } from './../base/base-model';
import { EvalData } from './eval-data';
import { PostModel } from './post.model';

export class CommentModel extends BaseModel {

    static readonly ModelName = 'CommentModel';

    static readonly Type = {
        post: 'post',
        notice: 'notice',
    };


    static readonly Target = {
        post: 'post',
        comment: 'comment',
    };

    ///////////////////////////////////////////////////

    @Attr contentType?: string;
    @Attr contentIdx?: string;
    @Attr targetType: string;
    @Attr targetIdx: string;
    @Attr targetUserIdx: string;
    @Attr commenterName: string;
    @Attr text: string; //내용
    @Attr daykey: number;
    @Attr display: string;

    ///////////////////////////////////////////////////

    userCreator: UserModel;
    userTarget: UserModel;
    postModel: PostModel;
    evalData: EvalData;

    ///////////////////////////////////////////////////


    createComment(): CommentModel {
        const ret = new CommentModel();
        ret.contentType = this.contentType;
        ret.contentIdx = this.contentIdx;
        ret.targetType = CommentModel.Target.comment;
        ret.targetIdx = this.objectId;
        return ret;
    }

    createReport(): ReportModel {
        const ret = new ReportModel();
        ret.contentIdx = this.contentIdx;
        ret.targetType = Cd.ContentClass.comment;
        ret.targetIdx = this.objectId;
        return ret;
    }

    ///////////////////////////////////////////////////



}
