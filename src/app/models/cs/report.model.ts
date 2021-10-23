import { Cd } from '../codes/cd';
import { CategoryModel } from '../communities/category.model';
import { CommentModel } from '../posts/comment.model';
import { PostModel } from '../posts/post.model';
import { UserModel } from '../users/user-model';
import { BaseModel, Attr } from './../base/base-model';

export class ReportModel extends BaseModel {

    static readonly ModelName = 'ReportModel';

    static readonly Target = {
        post: Cd.ContentClass.post,
        comment: Cd.ContentClass.comment,
    }

    @Attr targetType?: string;
    @Attr targetIdx?: string;

    @Attr contentIdx?: string;
    @Attr content?: string;
    @Attr confirmFlag: string;

    @Attr categoryIdx?: string;
    @Attr galleryIdx?: string;

    //////////////////////////////////////////

    userCreator: UserModel;
    // categoryModel: CategoryModel;

    postModel: PostModel;
    commentModel: CommentModel;

    //////////////////////////////////////////

    constructor(
        public attrs: any = {}
    ) {
        super(attrs);
    }

    //////////////////////////////////////////

    get targetName(): string {
        return Cd.ContentClassName[this.targetType];
    }

    get title(): string {
        if (this.postModel) {
            return this.postModel.title;
        }
    }

    //////////////////////////////////////////


    //////////////////////////////////////////

} // end of class
