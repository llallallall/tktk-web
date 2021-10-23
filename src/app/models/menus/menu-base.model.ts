import { BaseModel, Attr } from './../base/base-model';

export class MenuBaseModel extends BaseModel {


  @Attr id: string;
  @Attr title: string;
  @Attr selected: boolean;
  @Attr path: string;


  constructor(
    public attrs: any = {}
  ) {
    super(attrs || {});
    // if (attrs.isMain !== false) {
    //   attrs.isMain = true;
    // }
    this.selected = false;
    // this.title = MainMenulModel.getTitle(this.id);
    // this.path = this.path || MainMenulModel.getPath(this.id);
  }


  findMenu(pathUrl: string): MenuBaseModel {
    const ftag = `findMenu(${pathUrl}),`;
    if (pathUrl.startsWith(this.path)) {
      return this;
    }
  }

}