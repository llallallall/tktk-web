import { environment } from 'src/environments/environment';
import { Cd } from '../codes/cd';
import { CategoryModel } from '../communities/category.model';
import { GalleryModel } from '../communities/gallery.model';
import { ReportModel } from '../cs/report.model';
import { UserModel } from '../users/user-model';
import { BaseModel, Attr } from './../base/base-model';
import { CommentModel } from './comment.model';
import { EvalData } from './eval-data';

// https://trello.com/c/OeLU9EBG/45-게시글-등록-화면-문의


export class PostModel extends BaseModel {

    static readonly ModelName = 'PostModel';

    static readonly temp_resourceIdx = `undefined_post_idx`;

    // https://trello.com/c/OeLU9EBG/45-게시글-등록-화면-문의
    static readonly MediaType = {
        none: 'none', // 이미지, 영상없는게시글
        image: 'image', // 이미지만포함되어있는게시글
        video: 'video', // 영상, 이미지가포함되어있는게시글
    }

    @Attr postType: string;
    @Attr title: string;
    @Attr display: string;

    @Attr categoryIdx: string;
    @Attr galleryIdx: string;

    @Attr content: string;

    @Attr deletedFlag: string;
    @Attr hashtags: string[];
    @Attr mediaType: string; // MediaType
    @Attr imageId: string;
    @Attr youtubeId: string;

    // https://trello.com/c/mi8Hv9hH/103-조회수-기준-문의
    @Attr viewCount: number;

    @Attr noticeLocation: string;  // notice only
    @Attr noticeType: string; // notice only

    //////////////////////////////////////////

    categoryModel: CategoryModel;
    galleryModel: GalleryModel;
    userCreator: UserModel;
    evalData: EvalData;
    comments: CommentModel[] = [];

    changedHashtags = false;

    //////////////////////////////////////////

    constructor(public attrs: any = null) {
        super(attrs);
        this.display = this.display || Cd.YN.N;
        this.hashtags = this.hashtags || [];
    }

    //////////////////////////////////////////
    get validateErr(): string {
        if (!this.categoryIdx) {
            return `카테고리를 선택해 주세요.`;
        }
        if (!this.galleryIdx) {
            return `갤러리를 선택해 주세요.`;
        }
        if (!this.title) {
            return `제목을 입력해 주세요.`;
        }
        if (!this.content) {
            return `내용을 입력해 주세요.`;
        }
    }

    get submittable(): boolean {
        if (this.validateErr) {
            return false;
        }
        if (this.changedHashtags) {
            return true;
        }
        if (!this.hasChanged()) {
            return false;
        }
        return true;
    }


    //////////////////////////////////////////

    updateMediaType() {
        const ftag = `updateMediaType(),`;
        this.mediaType = PostModel.MediaType.none;

        // TOOD: find image id
        const imgKey = `&fileClass=${Cd.FileClass.post_image}&resourceIdx=${this.resourceIdx}&fileId=`;
        let index = this.content.indexOf(imgKey);
        console.log(ftag, 'index=', index);
        if (index > 0) {
            const indexLast = this.content.indexOf(`)`, index);
            console.log(ftag, 'indexLast=', indexLast);
            if (indexLast > index) {
                const text = this.content.substring(index, indexLast);
                console.log(ftag, 'text=', text);
                const id = text.replace(imgKey, '');
                if (id.length > 0 && id.length < 24) {
                    this.imageId = id;
                    this.mediaType = PostModel.MediaType.image;
                }
            }
        }

        index = this.content.indexOf('https://www.youtube.com/embed/');
        console.log(ftag, 'index=', index);
        if (index > 0) {
            const indexLast = this.content.indexOf(`"`, index);
            console.log(ftag, 'indexLast=', indexLast);
            if (indexLast > index) {
                const text = this.content.substring(index, indexLast);
                console.log(ftag, 'text=', text);
                const id = text.replace('https://www.youtube.com/embed/', '');
                if (id.length > 0 && id.length < 24) {
                    this.youtubeId = id;
                    this.mediaType = PostModel.MediaType.video;
                }
            }
        }

    }

    get resourceIdx(): string {
        if (this.objectId) {
            return this.objectId;
        }
        return  PostModel.temp_resourceIdx;
    }

    getImagePath(imageId: string) {
        return `${environment.apiServerUrl}/media/file?siteIdx=${this.siteIdx}&fileClass=${Cd.FileClass.post_image}&resourceIdx=${this.resourceIdx}&fileId=${imageId}`;
    }

    //////////////////////////////////////////

    createComment(): CommentModel {
        const ret = new CommentModel();
        ret.contentType = CommentModel.Type.post;
        ret.contentIdx = this.objectId;
        ret.targetType = CommentModel.Target.post;
        ret.targetIdx = this.objectId;
        return ret;
    }

    createReport(): ReportModel {
        const ret = new ReportModel();
        ret.contentIdx = this.objectId;
        ret.targetType = Cd.ContentClass.post;
        ret.targetIdx = this.objectId;
        return ret;
    }

    //////////////////////////////////////////

} // end of class
