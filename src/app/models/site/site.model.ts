import { FileResource } from '../base/file-resource';
import { Cd } from '../codes/cd';
import { CategoryModel } from '../communities/category.model';
import { UserModel } from '../users/user-model';
import { BaseModel, Attr } from './../base/base-model';
import { SiteSettingModel } from './site-setting.model';

export class SiteModel extends BaseModel {

    static readonly ModelName = 'SiteModel';

    static readonly DomainType = {
        builtin: 'builtin',
        personal: 'personal',
    };

    static readonly UiType = {
        ut_a: 'ut_a',
        ut_b: 'ut_b',
        ut_c: 'ut_c',
    };

    // - 계정 형식
    static readonly AccountType = {
        id: UserModel.Auth.id, // 아이디(기본)
        email: UserModel.Auth.email, // 이메일
    };

    @Attr siteId: string;
    // https://crazyup.monday.com/boards/1691140764/views/35157687/pulses/1718396850        
    @Attr siteName: string; // 게시판 이름
    @Attr accountType: string; // AccountType
    @Attr imageId: string;
    @Attr uiType: string;
    @Attr domainType: string;
    @Attr domainUrl: string;
    @Attr categoryList: string[];

    //////////////////////////////////////////

    categoryModels: CategoryModel[] = [];
    siteSettingModel: SiteSettingModel = new SiteSettingModel();

    image: FileResource;
    localResource: FileResource;

    //////////////////////////////////////////

    constructor(public attrs: any = null) {
        super(attrs);
        this.categoryList = this.categoryList || [];
        if (attrs?.siteSettingModel) {
            this.siteSettingModel = new SiteSettingModel(attrs.siteSettingModel);
        }
        // this.siteSettingModel.siteIdx = this.objectId;
        this.siteSettingModel.set('siteIdx', this.objectId, false);
        this.uiType = this.uiType || SiteModel.UiType.ut_a;

        if (this.imageId) {
            this.image = new FileResource();
            this.image.setResource(this.objectId, Cd.FileClass.site_logo, this.objectId, this.imageId);
        }
    }

    //////////////////////////////////////////

    get validateErr(): string {
        if (!this.siteId) {
            return `게시판 아이디를 입력해 주세요.`;
        }
        if (!this.uiType) {
            return `사이트 타입을 입력해 주세요.`;
        }
    }

    get logoUrl(): string {
        if (this.image) {
            return this.image.imgPath;
        }
    }

    get logoFooter(): string {
        if (this.siteSettingModel.image) {
            return this.siteSettingModel.image.imgPath;
        }
    }

} // end of class
