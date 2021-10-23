import { Injectable } from '@angular/core';
import * as _ from 'lodash';
import { Cd } from '../models/codes/cd';
import { CategoryModel } from '../models/communities/category.model';
import { GalleryModel } from '../models/communities/gallery.model';
import QueryParams from '../models/params/query.params';
import { CommentModel } from '../models/posts/comment.model';
import { CommentParam } from '../models/posts/comment.param';
import { EvalData } from '../models/posts/eval-data';
import { EvaluateModel } from '../models/posts/evaluate.model';
import { PostModel } from '../models/posts/post.model';
import { PostParam } from '../models/posts/post.param';
import { SiteModel } from '../models/site/site.model';
import { ApiService } from './api.service';
import { CategoryService } from './category.service';
import { ModelStoreService } from './model-store.service';
import { UsersService } from './users.service';


@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(
    public _api: ApiService,
    public _category: CategoryService,
    public _users: UsersService,
  ) {
    // console.log('ftag', 'menus=', this.menus);
  }

  get _store(): ModelStoreService {
    return this._api._store;
  }

  async loadItems(qp: PostParam): Promise<{
    items: PostModel[],
    qp: PostParam,
  }> {
    const ftag = `loadItems(),`;
    try {

      qp.pageSize = qp.pageSize || 30;
      // this.qp.set('siteIdx', this._api.siteIdx);
      const res: any = await this._api.reqPostCmd('post_list', {
        queryParams: qp.getAttrs(),
      });
      console.log(ftag, 'res=', res);
      const items = [];
      if (res.result) {
        qp = new PostParam(res.queryParams);
        for (const item of res.result) {
          const m = new PostModel(item);
          await this.loadPostInfo(m);
          this._store.setModel(PostModel.ModelName, m);
          items.push(m);
        }
      }
      return {
        items: items,
        qp: qp,
      }
      // console.log(ftag, 'items=', this.items);
    } catch (err) {
      console.log(ftag, 'err=', err);
      throw err;
    }
  }

  async loadItemIfNeed(objectId: string): Promise<PostModel> {
    const ftag = `loadItemIfNeed(${objectId}),`;

    try {
      const m = this._store.getModel(PostModel.ModelName, objectId);
      if (m) {
        return <PostModel>m;
      }
      return await this.post_get(objectId);
    } catch (err) {
      console.log(ftag, 'err=', err);
      throw err;
    }
  }

  async post_get(objectId: string): Promise<PostModel> {
    const ftag = `post_get(${objectId}),`;

    try {
      const res = await this._api.reqPostCmd('post_get', {
        objectId: objectId,
      });
      if (res.result) {
        const m = new PostModel(res.result);
        await this.loadPostInfo(m);
        this._store.setModel(CategoryModel.ModelName, m);
        return m;
      }
      console.log(ftag, 'res=', res);
    } catch (err) {
      console.log(ftag, 'err=', err);
      throw err;
    }
  }

  async comment_get(objectId: string): Promise<CommentModel> {
    const ftag = `comment_get(${objectId}),`;

    try {
      const res = await this._api.reqCommentCmd('comment_get', {
        objectId: objectId,
      });
      if (res.result) {
        const m = new CommentModel(res.result);
        // await this.loadPostInfo(m);
        // this._store.setModel(CategoryModel.ModelName, m);
        return m;
      }
      console.log(ftag, 'res=', res);
    } catch (err) {
      console.log(ftag, 'err=', err);
      throw err;
    }
  }

  async loadPostInfo(postModel: PostModel): Promise<PostModel> {
    const ftag = `loadPostInfo(${postModel.objectId}),`;

    try {
      postModel.categoryModel = await this._category.loadCategoryIfNeed(postModel.categoryIdx);
      postModel.galleryModel = await this._category.loadGalleryIfNeed(postModel.galleryIdx);
      postModel.userCreator = await this._users.user_get_ifNeed(postModel.creatorIdx);
      return postModel;
    } catch (err) {
      console.log(ftag, 'err=', err);
      throw err;
    }
  }

  async loadEvalData(postModel: PostModel): Promise<PostModel> {
    const ftag = `loadEvalData(${postModel.objectId}),`;

    try {
      const res = await this._api.reqEvalCmd('evaluate_get', {
        targetType: EvaluateModel.Target.post,
        targetIdx: postModel.objectId,
      });
      if (res.result) {
        postModel.evalData = new EvalData(res.result);
      }
      return postModel;
    } catch (err) {
      console.log(ftag, 'err=', err);
      throw err;
    }
  }

  async loadEvalDataOnComment(commentModel: CommentModel): Promise<CommentModel> {
    const ftag = `loadEvalDataOnComment(${commentModel.objectId}),`;

    try {
      const res = await this._api.reqEvalCmd('evaluate_get', {
        targetType: EvaluateModel.Target.comment,
        targetIdx: commentModel.objectId,
      });
      if (res.result) {
        commentModel.evalData = new EvalData(res.result);
      }
      return commentModel;
    } catch (err) {
      console.log(ftag, 'err=', err);
      throw err;
    }
  }


  async loadComments(postModel: PostModel, qp = new CommentParam()) {
    const ftag = `loadComments(),`;
    try {
      qp.targetIdx = qp.targetIdx || postModel.objectId;
      qp.targetType = qp.targetType || Cd.ContentClass.post;
      const res = await this._api.reqCommentCmd('comment_list', {
        queryParams: qp.getAttrs(),
      })
      console.log(ftag, 'res=', res);
      if (res.result) {
        postModel.comments = [];
        for (const item of res.result) {
          const m = new CommentModel(item);
          m.userCreator = await this._users.user_get_ifNeed(m.creatorIdx);
          if (m.targetUserIdx) {
            m.userTarget = await this._users.user_get_ifNeed(m.targetUserIdx);
          }
          postModel.comments.push(m);
        }
        // this.qp = new CommentParam(res.queryParams);
        // console.log(ftag, 'qp=', this.qp);
      }

    } catch (err) {
      console.log(ftag, 'err=', err);
    }
  }

} // end of class
