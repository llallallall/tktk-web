import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Cd } from 'src/app/models/codes/cd';
import { CommentModel } from 'src/app/models/posts/comment.model';
import { CommentParam } from 'src/app/models/posts/comment.param';
import { EvalData } from 'src/app/models/posts/eval-data';
import { EvaluateModel } from 'src/app/models/posts/evaluate.model';
import { PostModel } from 'src/app/models/posts/post.model';
import { UserModel } from 'src/app/models/users/user-model';
import { ApiService } from 'src/app/service/api.service';
import { PostService } from 'src/app/service/post.service';
import { UsersService } from 'src/app/service/users.service';
import { fadeIn } from 'src/app/share/animations/fade-in.animation';
import DlgUtil from 'src/app/utils/dlg.util';
import { CommentAddBsComponent } from '../comment-add-bs/comment-add-bs.component';


@Component({
  selector: 'app-post-comment-item',
  templateUrl: './post-comment-item.component.html',
  styleUrls: ['./post-comment-item.component.scss',],
  animations: [fadeIn,],
})
export class PostCommentItemComponent implements OnInit {

  @Input() commentModel: CommentModel;

  qp = new CommentParam();
  isLoading = false;
  items: CommentModel[] = [];


  constructor(
    private _api: ApiService,
    private _users: UsersService,
    private _post: PostService,
    private _bs: MatBottomSheet,
    private _dlg: MatDialog,
    private _sb: MatSnackBar,
  ) { }

  ngOnInit(): void {
    const ftag = `ngOnInit(),`;
    this.qp.initQp();
    this.qp.targetType = CommentModel.Target.comment;
    this.qp.targetIdx = this.commentModel.objectId;

    this.loadItems();
  }

  onClickText() {
    const ftag = `onClickText(),`;

    const ref = this._bs.open(CommentAddBsComponent, {
      data: {
        commentModel: this.commentModel.createComment(),
      }
    });
    ref.afterDismissed().subscribe(result => {
      console.log(ftag, 'result=', result);
      if (result) {
        this.loadItems();
      }
    });
  }

  get me(): UserModel {
    return this._api.me;
  }

  async loadItems() {
    const ftag = `loadItems(),`;
    try {
      this.isLoading = true;
      await this._post.loadEvalDataOnComment(this.commentModel);
      this.qp.pageSize = 300;
      const res = await this._api.reqCommentCmd('comment_list', {
        queryParams: this.qp.getAttrs(),
      })
      this.isLoading = false;
      console.log(ftag, 'commentModel=', this.commentModel);
      console.log(ftag, 'res=', res);
      if (res.result) {
        this.items = [];
        for (const item of res.result) {
          const m = new CommentModel(item);
          m.userCreator = await this._users.user_get_ifNeed(m.creatorIdx);
          if (m.targetUserIdx) {
            m.userTarget = await this._users.user_get_ifNeed(m.targetUserIdx);
          }          
          this.items.push(m);
        }
        this.qp = new CommentParam(res.queryParams);
        console.log(ftag, 'qp=', this.qp);
      }

    } catch (err) {
      this.isLoading = false;
      console.log(ftag, 'err=', err);
    }
  }

  get evalData(): EvalData {
    return this.commentModel.evalData;
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
        targetType: EvaluateModel.Target.comment,
        targetIdx: this.commentModel.objectId,
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
        await this._post.loadEvalDataOnComment(this.commentModel);
        this.isLoading = false;
      }
    } catch (err) {
      this.isLoading = false;
      console.log(ftag, 'err=', err);
    }
  }

  onClickReport() {

    if (this.evalData.reportIdx) {
      DlgUtil.showSnack(this._sb, `이미 신고한 상태입니다.`);
      return;
    }

    const ref = DlgUtil.showReport(this._dlg, this.commentModel.createReport());
    ref.afterClosed().subscribe(result => {
      // console.log(ftag, 'result=', result);
      if (result) {
        this._post.loadEvalDataOnComment(this.commentModel);
      }
    });
  }

}
