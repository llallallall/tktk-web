import { FileResource } from '../base/file-resource';
import { Cd } from '../codes/cd';
import { UserModel } from '../users/user-model';
import { BaseModel, Attr } from './../base/base-model';
import { FooterItemModel } from './footer-item.model';

// https://trello.com/c/aryYBBbv/31-어드민-사이트-구분-표시
// https://docs.google.com/spreadsheets/d/1_loxojV4_t0MmLjpDL42xv2QgYHsrtBOglzX5Mzu0c8/edit#gid=339556396


export class SiteSettingModel extends BaseModel {

    static readonly ModelName = 'SiteSettingModel';

    @Attr copyright: string; //Copyright 문구
    @Attr footerLogoImgId: string; // 로고 이미지
    @Attr uiType: string; // 게시판 타입    
    @Attr expsureItems: string[];
    // - 이름     // - 이메일     // - 생년월일     // - 성별     // - 본인인증     // - 성인인증

    @Attr footerInfos: any; // 푸터 정보    
    // - 이용약관 명칭 및 링크     // - 개인정보처리방침 명칭 및 링크     // - 청소년보호정책 명칭 및 링크


    //////////////////////////////////////////

    image: FileResource;
    localResource: FileResource;
    links: FooterItemModel[] = [];
    addingLink = new FooterItemModel();

    //////////////////////////////////////////

    constructor(public attrs: any = null) {
        super(attrs);
        if (this.footerLogoImgId) {
            this.image = new FileResource();
            this.image.setResource(this.siteIdx, Cd.FileClass.site_footer_logo, this.siteIdx, this.footerLogoImgId);
        }
        if (attrs?.footerInfos) {
            for (const item of attrs.footerInfos) {
                const m = new FooterItemModel(item);
                this.links.push(m);
            }
        }
    }

    //////////////////////////////////////////



} // end of class
