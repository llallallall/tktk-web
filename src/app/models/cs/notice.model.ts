import { Cd } from '../codes/cd';
import { CategoryModel } from '../communities/category.model';
import { GalleryModel } from '../communities/gallery.model';
import { PostModel } from '../posts/post.model';
import { UserModel } from '../users/user-model';
import { BaseModel, Attr } from './../base/base-model';

export class NoticeModel extends PostModel {

    //////////////////////////////////////////

    static readonly LocationName = {
        site: '공지',
        gallery: '게시글',
    };

    static readonly PosTypeName = {
        top_fixed: '고정',
        general: '일반',
    };

    //////////////////////////////////////////

    constructor(public attrs: any = null) {
        super(attrs);
        // this.location = this.location || NoticeModel.Location.posts;
    }

    // //////////////////////////////////////////
    get isDeleted(): boolean {
        return this.deletedFlag === Cd.YN.Y;
    }

    // //////////////////////////////////////////


    get validateErr(): string {
        if (!this.noticeLocation) {
            return `위치를 선택해 주세요.`;
        }
        if (this.noticeLocation === Cd.NoticeLocation.site) {
            if (!this.noticeType) {
                return `표시 방식을 선택해 주세요.`;
            }
        }
        if (this.noticeLocation === Cd.NoticeLocation.gallery) {
            if (!this.categoryIdx) {
                return `카테고리를 선택해 주세요.`;
            }
            if (!this.galleryIdx) {
                return `갤러리를 선택해 주세요.`;
            }
        }
        if (!this.title) {
            return `제목을 입력해 주세요.`;
        }
        if (!this.content) {
            return `내용을 입력해 주세요.`;
        }
    }

    // get submittable(): boolean {
    //     if (!this.hasChanged()) {
    //         return false;
    //     }
    //     return this.validateErr ? false : true;
    // }

    //////////////////////////////////////////

} // end of class
