import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/service/api.service';
import { fadeIn } from 'src/app/share/animations/fade-in.animation';
import * as _ from 'lodash';
import { PostModel } from 'src/app/models/posts/post.model';
import { CategoryService } from 'src/app/service/category.service';
import { UsersService } from 'src/app/service/users.service';
import { CommentModel } from 'src/app/models/posts/comment.model';
import { PostParam } from 'src/app/models/posts/post.param';
import { PostService } from 'src/app/service/post.service';
import { EvalData } from 'src/app/models/posts/eval-data';
import { UserModel } from 'src/app/models/users/user-model';
import DlgUtil from 'src/app/utils/dlg.util';
import { Cd } from 'src/app/models/codes/cd';
import { EvaluateModel } from 'src/app/models/posts/evaluate.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-notice-detail',
  templateUrl: './notice-detail.component.html',
  styleUrls: ['./notice-detail.component.scss', './notice-detail.css'],
  animations: [fadeIn,],
})
export class NoticeDetailComponent implements OnInit {

  isLoading = false;
  postModel: PostModel;
  qp = new PostParam();
  // editor: Editor;
  commentAdding: CommentModel;


  constructor(
    private _api: ApiService,
    private _post: PostService,
    private _category: CategoryService,
    private _users: UsersService,
    private _aRoute: ActivatedRoute,
    private _dlg: MatDialog,
    private _sb: MatSnackBar,
  ) { }

  ngOnInit(): void {
    // this.setEditor();
    this.parseParams();
  }

  parseParams() {
    const ftag = `parseParams()`;
    this._aRoute.queryParams.subscribe((querys) => {
      // console.log(ftag, 'querys=', querys);
      const q = _.clone(querys);
      this.qp = new PostParam(q);
      // console.log(ftag, 'pageParams=', this.pageParams.getAttrs());
      // console.log(ftag, 'searchWord=', this.pageParams.get('searchWord'));
      this.loadModel();
    });
  }

  async loadModel() {
    const ftag = `loadItems(),`;
    try {
      this.isLoading = true;
      this.postModel = await this._post.post_get(this.qp.objectId);
      await this._post.loadEvalData(this.postModel);
      this.isLoading = false;
      if (this.postModel) {
        // this.editor.setMarkdown(this.postModel.content);
        this.commentAdding = this.postModel.createComment();
      }
      console.log(ftag, 'postModel=', this.postModel);
  
    } catch (err) {
      this.isLoading = false;
      console.log(ftag, 'err=', err);
    }
  }

  // setEditor() {
  //   const ftag = `setEditor(),`;

  //   this.editor = new ToastuiEditorViewer({
  //     el: document.querySelector('#editor'),
  //     height: '100%',
  //     content: '#hello',
  //     customHTMLSanitizer: this.customHTMLSanitizer.bind(this),
  //   });
  //   console.log(ftag, 'editor=', this.editor);

  // }

  // customHTMLSanitizer($event) {
  //   const ftag = `customHTMLSanitizer(),`;
  //   console.log(ftag, '$event=', $event);
  //   return $event;
  // }

  on_comment_added($event) {
    const ftag = `on_comment_added(),`;
    console.log(ftag, '$event=', $event);
    this.commentAdding = this.postModel.createComment();
    this.loadModel();
  }

  get evalData(): EvalData {
    return this.postModel.evalData;
  }

  get me(): UserModel {
    return this._api.me;
  }

  async onClickRate(isLike: boolean) {
    const ftag = `onClickRate(${isLike}),`;
    try {
      if (!this.me) {
        const ref = DlgUtil.showConfirm(this._dlg, {
          title: `로그인이 필요한 기능입니다. \n로그인 하시겠습니까?`,
          okBtnColor: 'primary',
          showCancel: Cd.YN.Y,
        });
        ref.afterClosed().subscribe(result => {
          // console.log(ftag, 'result=', result);
          if (result) {
            this._api.config.gotoLogin();
          }
        });
        return;
      }
      if (this.evalData.checkedLike) {
        if (isLike && this.evalData.checkedLike === Cd.YN.Y) {
          DlgUtil.showSnack(this._sb, `이미 좋아요를 한 상태입니다.`);
          return;
        }
        if (!isLike && this.evalData.checkedLike === Cd.YN.N) {
          DlgUtil.showSnack(this._sb, `이미 싫어요를 한 상태입니다.`);
          return;
        }
      }
      this.isLoading = true;
      const res = await this._api.reqEvalCmd('evaluate_put', {
        targetType: EvaluateModel.Target.post,
        targetIdx: this.postModel.objectId,
        checkedLike: isLike ? Cd.YN.Y : Cd.YN.N,
      });
      this.isLoading = false;
      console.log(ftag, 'res=', res);
      if (res.error) {
        DlgUtil.showIfErrMsg(this._dlg, res);
        return;
      }
      if (res.result) {
        this.isLoading = true;
        await this._post.loadEvalData(this.postModel);
        this.isLoading = false;
      }
    } catch (err) {
      this.isLoading = false;
      console.log(ftag, 'err=', err);
    }
  }


}
