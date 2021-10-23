import { Cd } from '../codes/cd';
import { BaseModel, Attr } from './../base/base-model';
import { GalleryModel } from './gallery.model';

export class CategoryModel extends BaseModel {

    static readonly ModelName = 'CategoryModel';

    @Attr name: string;
    @Attr display: string;
    @Attr modelName: string;
    @Attr galleryList: string[];

    //////////////////////////////////////////

    galleryModels: GalleryModel[] = [];

    //////////////////////////////////////////

    constructor(public attrs: any = null) {
        super(attrs);
        this.set('modelName', CategoryModel.ModelName, false);
        this.display = this.display || Cd.YN.N;
        if (attrs.galleryModels) {
            for (const item of attrs.galleryModels) {
                const m = new GalleryModel(item);
                this.galleryModels.push(m);
            }
        }
    }


    //////////////////////////////////////////

    get galleryCount(): number {
        if (this.galleryList) {
            return this.galleryList.length;
        }
        return 0;
    }

    get validateErr(): string {
        if (!this.name) {
            return `카테고리 이름을 입력해 주세요.`;
        }
    }

    get submittable(): boolean {
        if (!this.hasChanged()) {
            return false;
        }
        return this.validateErr ? false : true;
    }

    get isDisplay(): boolean {
        return this.display === Cd.YN.Y;
    }


    //////////////////////////////////////////



    //////////////////////////////////////////

} // end of class
