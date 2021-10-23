import { Component, Input, OnInit } from '@angular/core';
import { CategoryModel } from 'src/app/models/communities/category.model';
import { GalleryModel } from 'src/app/models/communities/gallery.model';
import { ApiService } from 'src/app/service/api.service';
import { CategoryService } from 'src/app/service/category.service';

@Component({
  selector: 'app-hm-category',
  templateUrl: './hm-category.component.html',
  styles: [
  ]
})
export class HmCategoryComponent implements OnInit {

  @Input() model: CategoryModel;
  isLoading = true;

  constructor(
    private _api: ApiService,
    private _category: CategoryService,
  ) { }

  ngOnInit(): void {
  }

  async on_opened() {
    const ftag = `on_opened(),`;
    try {
      this.isLoading = true;
      await this._category.loadGallerysIfNeed(this.model);
      this.isLoading = false;
      console.log(ftag, 'items=', this.items);
    } catch (err) {
      this.isLoading = false;
      console.log(ftag, 'err=', err);
    }
  }

  on_afterExpand() {
    const ftag = `on_afterExpand(),`;
    // console.log(ftag,);
  }

  get items(): GalleryModel[] {
    return this.model.galleryModels;
  }

  onClickItem(item: GalleryModel) {
    this._api.navigate('/p/h/gallery/gh', {
      queryParams: {
        galleryIdx: item.objectId,
      },
    });
  }

}
