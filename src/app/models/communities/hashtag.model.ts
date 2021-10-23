import { BaseModel, Attr } from './../base/base-model';
import { CategoryModel } from './category.model';
import { GalleryModel } from './gallery.model';


export class HashtagModel extends BaseModel {

    static readonly ModelName = 'HashtagModel';

    @Attr categoryIdx?: string;
    @Attr galleryIdx?: string;
    @Attr hashtag?: string;

    //////////////////////////////////////////

    categoryModel: CategoryModel;
    galleryModel: GalleryModel;

    //////////////////////////////////////////





} // end of class
