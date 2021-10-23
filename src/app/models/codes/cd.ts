import * as _ from 'lodash';
import * as moment from 'moment';

export class Cd {

    static readonly All = 'all';

    static readonly YN = {
        Y: 'Y',
        N: 'N',
    };

    static isYes(value: string): boolean {
        if (value === Cd.YN.Y) {
            return true;
        }
        return false;
    }

    static readonly Sex = {
        male: 'M',
        female: 'F',
        all: 'A',
    };

    static readonly FileClass = {
        site_logo: 'site_logo',
        site_footer_logo: 'site_footer_logo',
        banner: 'banner',
        gallery: 'gallery',
        post_content: 'post_content',
        post_image: 'post_image',
        profilePhoto: 'profilePhoto',
        qna_attach: 'qna_attach',
        notice_image: 'notice_image',
    };

    static readonly ContentClass = {
        post: 'post',
        comment: 'comment',
    };

    static readonly ContentClassName = {
        post: '게시글',
        comment: '댓글',
    };

    static readonly PostType = {
        gallery: 'gallery',
        notice: 'notice',
    };

    static readonly NoticeLocation = {
        site: 'site',
        gallery: 'gallery',
    };

    static readonly NoticeType = {
        top_fixed: 'top_fixed',
        general: 'general',
    };   

}
