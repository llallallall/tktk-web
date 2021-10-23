import { FileResource } from '../base/file-resource';
import { Cd } from '../codes/cd';
import { UserModel } from '../users/user-model';
import { BaseModel, Attr } from './../base/base-model';


export class FooterItemModel extends BaseModel {

    static readonly ModelName = 'FooterItemModel';

    @Attr name: string;
    @Attr url: string;

    isNew = false;

    //////////////////////////////////////////

    //////////////////////////////////////////

    //////////////////////////////////////////


} // end of class
