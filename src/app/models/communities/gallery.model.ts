import { FileResource } from '../base/file-resource';
import { Cd } from '../codes/cd';
import { UserModel } from '../users/user-model';
import { BaseModel, Attr } from './../base/base-model';
import { CategoryModel } from './category.model';


export class GalleryModel extends BaseModel {

    public static readonly ModelName = 'GalleryModel';

    @Attr categoryIdx: string;
    @Attr name: string;
    @Attr display: string;
    @Attr imageId: string;
    @Attr introduce: string;

    categoryModel: CategoryModel;
    // manager: UserModel;
    // sub_managers: UserModel[] = [];
    managerList: UserModel[] = [];

    //////////////////////////////////////////

    image: FileResource;
    localResource: FileResource;

    postCount = 0;

    //////////////////////////////////////////

    constructor(public attrs: any = null) {
        super(attrs);
        this.set('modelName', GalleryModel.ModelName, false);
        this.display = this.display || Cd.YN.N;
        if (this.imageId) {
            this.image = new FileResource();
            this.image.setResource(this.siteIdx, Cd.FileClass.gallery, this.objectId, this.imageId);
        }
    }

    //////////////////////////////////////////


    get validateErr(): string {
        if (!this.name) {
            return `갤러리 이름을 입력해 주세요.`;
        }
    }

    hasChanged(key = null): boolean {
        if (!key && this.localResource) {
            return true;
        }
        return super.hasChanged(key);
    }

    //////////////////////////////////////////

    get manager(): UserModel {
        for (const item of this.managerList) {
            if (item.userLevel === UserModel.UserLevel.manager) {
                return item;
            }
        }
    }

    get subManagers(): UserModel[] {
        return this.managerList.filter((v) => {
            if (v.userLevel === UserModel.UserLevel.manager_sub) {
                return true;
            }
        });
    }

    get imgUrl(): string {
        if (this.image) {
            return this.image.imgPath;
        }
    }

    //////////////////////////////////////////



} // end of class
