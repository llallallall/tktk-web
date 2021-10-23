import * as _ from 'lodash';
import { FileResource } from '../base/file-resource';
import { Cd } from '../codes/cd';
import { BaseModel, Attr } from './../base/base-model';

export class Model extends BaseModel {

    public static readonly ModelName = 'Model';

    // https://trello.com/c/fSyhTSh7/46-배너-등록에서-파일명의-용도-문의
    static readonly Location = {
        main: 'main',
    };

    @Attr title: string;
    @Attr desc: string;
    // https://trello.com/c/kSCB4z27/52-배너-이미지-영역에-pc-문구
    @Attr imageIdPc: string;
    @Attr imageIdMobile: string;
    // @Attr imageId: string;

    @Attr display: string;
    @Attr url: string;
    @Attr location: string;

    //////////////////////////////////////////

    imagePc: FileResource;
    localResourcePc: FileResource;
    imageMobile: FileResource;
    localResourceMobile: FileResource;

    //////////////////////////////////////////


    constructor(public attrs: any = null) {
        super(attrs);
        this.set('modelName', Model.ModelName, false);
        this.display = this.display || Cd.YN.N;
        if (this.imageIdPc) {
            this.imagePc = new FileResource();
            this.imagePc.setResource(this.siteIdx, Cd.FileClass., this.objectId, this.imageIdPc);
        }
        if (this.imageIdMobile) {
            this.imageMobile = new FileResource();
            this.imageMobile.setResource(this.siteIdx, Cd.FileClass., this.objectId, this.imageIdMobile);
        }
    }

    //////////////////////////////////////////
    hasChanged(key = null): boolean {
        if (!key) {
            if (this.localResourcePc) {
                return true;
            }
            if (this.localResourceMobile) {
                return true;
            }
            return true;
        }
        return super.hasChanged(key);
    }

    //////////////////////////////////////////

    get validateErr(): string {
        if (!this.title) {
            return `제목을 입력해 주세요.`;
        }
        if (!this.desc) {
            return `배너 설명을 입력해 주세요.`;
        }
        if (!this.url) {
            return `연결된 URL을 입력해 주세요.`;
        }
        if (!this.imageIdPc) {
            if (!this.localResourcePc) {
                return `배너 이미지를 입력해 주세요.`;
            }
        }
        if (!this.imageIdMobile) {
            if (!this.localResourceMobile) {
                return `모바일용 배너 이미지를 입력해 주세요.`;
            }
        }

    }

    get submittable(): boolean {
        if (!this.hasChanged()) {
            return false;
        }
        return this.validateErr ? false : true;
    }

    get locationName(): string {
        return '메인';
    }


    //////////////////////////////////////////

} // end of class
