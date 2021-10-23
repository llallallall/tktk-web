import { Cd } from '../codes/cd';
import QueryParams from '../params/query.params';
import { BaseModel, Attr } from './../base/base-model';
import { CategoryModel } from './category.model';
import { GalleryModel } from './gallery.model';
import { HashtagModel } from './hashtag.model';

export class HashtagParam extends QueryParams {

    @Attr categoryIdx: string;
    @Attr galleryIdx: string;


    //////////////////////////////////////////

    categoryModel: CategoryModel;

    //////////////////////////////////////////

    constructor(attrs: any = {}) {
        super(attrs);
        this.modelName = HashtagModel.ModelName;
    }

    //////////////////////////////////////////
    initQp() {
        const ftag = `initQp(),`;

        this.pageSize = this.pageSize || 30;
        this.categoryIdx = this.categoryIdx || Cd.All;
        this.galleryIdx = this.galleryIdx || Cd.All;
    }

    //////////////////////////////////////////

    clearQp() {
        this.searchWord = null;
        this.categoryIdx = Cd.All;
        this.galleryIdx = Cd.All;
    }
    //////////////////////////////////////////


    //////////////////////////////////////////

} // end of class
