import { Injectable } from '@angular/core';
import * as _ from 'lodash';
import { CategoryModel } from '../models/communities/category.model';
import { GalleryModel } from '../models/communities/gallery.model';
import QueryParams from '../models/params/query.params';
import { SiteModel } from '../models/site/site.model';
import { ApiService } from './api.service';
import { ModelStoreService } from './model-store.service';


@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(
    public _api: ApiService,
  ) {
    // console.log('ftag', 'menus=', this.menus);
  }

  get _store(): ModelStoreService {
    return this._api._store;
  }

  get siteModel(): SiteModel {
    return this._api.siteModel;
  }

  get items(): CategoryModel[] {
    return this.siteModel.categoryModels;
  }

  getCategoryModel(categoryIdx: string): CategoryModel {
    for (const item of this.items) {
      if (item.objectId === categoryIdx) {
        return item;
      }
    }
  }

  async loadItemsIfNeed(): Promise<CategoryModel[]> {
    const ftag = `loadItemsIfNeed(),`;
    try {
      if (!this._api.siteModel) {
        throw new Error(`no siteModel in ${ftag}`);
      }
      if (this.items.length === this.siteModel.categoryList.length) {
        return this.items;
      }
      await this.loadItems();
    } catch (err) {
      console.log(ftag, 'err=', err);
    }
  }

  async loadItems() {
    const ftag = `loadItems(),`;
    try {
      if (!this._api.siteModel) {
        throw new Error(`no siteModel in ${ftag}`);
      }
      await this._api.reqGetSite(this.siteModel.siteId);
      // this.siteModel.categoryModels = [];
      const qp = new QueryParams();
      qp.pageSize = 300;
      const res = await this._api.reqCategoryCmd('category_list', {
        queryParams: qp.getAttrs(),
      });
      // console.log(ftag, 'res=', res);
      this.siteModel.categoryModels = [];
      for (const item of res.result) {
        const m = new CategoryModel(item);
        this._store.setModel(CategoryModel.ModelName, m);
        this.siteModel.categoryModels.push(m);
      }
      // for (const item of this.siteModel.categoryList) {
      //   const m = await this.loadCategory(item);
      //   if (m) {
      //     this.siteModel.categoryModels.push(m);
      //   }
      // }
    } catch (err) {
      console.log(ftag, 'err=', err);
    }
  }

  async loadCategoryIfNeed(categoryIdx: string): Promise<CategoryModel> {
    const ftag = `loadCategoryIfNeed(${categoryIdx}),`;

    try {
      const m = this._store.getModel(CategoryModel.ModelName, categoryIdx);
      if (m) {
        return <CategoryModel>m;
      }
      return await this.loadCategory(categoryIdx);
    } catch (err) {
      console.log(ftag, 'err=', err);
      throw err;
    }
  }

  async loadCategory(categoryIdx: string): Promise<CategoryModel> {
    const ftag = `loadCategory(${categoryIdx}),`;

    try {
      const res = await this._api.reqCrudCmd('crud_get', {
        modelName: CategoryModel.ModelName,
        objectId: categoryIdx,
      });
      if (res.result) {
        const m = new CategoryModel(res.result);
        this._store.setModel(CategoryModel.ModelName, m);
        return m;
      }
      // console.log(ftag, 'res=', res);
    } catch (err) {
      console.log(ftag, 'err=', err);
      throw err;
    }
  }

  async loadGalleryIfNeed(galleryIdx: string): Promise<GalleryModel> {
    const ftag = `loadGalleryIfNeed(${galleryIdx}),`;

    try {
      const m = this._store.getModel(GalleryModel.ModelName, galleryIdx);
      if (m) {
        return <GalleryModel>m;
      }
      return await this.loadGallery(galleryIdx);
    } catch (err) {
      console.log(ftag, 'err=', err);
      throw err;
    }
  }

  async loadGallery(galleryIdx: string): Promise<GalleryModel> {
    const ftag = `loadGallery(${galleryIdx}),`;

    try {
      const res = await this._api.reqCrudCmd('crud_get', {
        modelName: GalleryModel.ModelName,
        objectId: galleryIdx,
      });
      if (res.result) {
        const m = new GalleryModel(res.result);
        this._store.setModel(GalleryModel.ModelName, m);
        return m;
      }
      console.log(ftag, 'res=', res);
    } catch (err) {
      console.log(ftag, 'err=', err);
      throw err;
    }
  }

  async loadGallerysIfNeed(categoryModel: CategoryModel) {
    const ftag = `loadGallerysIfNeed(${categoryModel.objectId}),`;

    try {
      // console.log(ftag, 'galleryList=', categoryModel.galleryList);
      // console.log(ftag, 'galleryModels=', categoryModel.galleryModels);
      categoryModel.galleryList = categoryModel.galleryList || [];
      if (categoryModel.galleryList.length !== categoryModel.galleryModels.length) {
        await this.loadGalleryList(categoryModel);
      }
    } catch (err) {
      console.log(ftag, 'err=', err);
      throw err;
    }
  }

  async loadGalleryList(categoryModel: CategoryModel) {
    const ftag = `loadGalleryList(${categoryModel.objectId}),`;

    try {
      console.log(ftag, );
      const m = await this.category_detail(categoryModel.objectId);
      categoryModel.galleryModels = m.galleryModels;
    } catch (err) {
      console.log(ftag, 'err=', err);
      throw err;
    }
  }

  async category_detail(categoryIdx: string): Promise<CategoryModel> {
    const ftag = `category_detail(${categoryIdx}),`;

    try {
      const res = await this._api.reqCategoryCmd('category_detail', {
        categoryIdx: categoryIdx,
      });
      console.log(ftag, 'res=', res);
      if (res.result) {
        const m = new CategoryModel(res.result);
        this._store.setModel(CategoryModel.ModelName, m);
        return m;
      }
      console.log(ftag, 'res=', res);
    } catch (err) {
      console.log(ftag, 'err=', err);
      throw err;
    }
  }

} // end of class
