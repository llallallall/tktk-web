import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Cd } from 'src/app/models/codes/cd';
import { CommentModel } from 'src/app/models/posts/comment.model';
import { PostModel } from 'src/app/models/posts/post.model';
import { UserModel } from 'src/app/models/users/user-model';
import { ApiService } from 'src/app/service/api.service';
import { fadeIn } from 'src/app/share/animations/fade-in.animation';
import DlgUtil from 'src/app/utils/dlg.util';

@Component({
  selector: 'app-comment-add',
  templateUrl: './comment-add.component.html',
  styleUrls: ['./comment-add.component.scss',],
  animations: [fadeIn,],
})
export class CommentAddComponent implements OnInit {

  @Input() model: CommentModel;
  @Output() on_changed = new EventEmitter();

  isLoading = false;
  commentAdding: CommentModel;

  constructor(
    private _api: ApiService,
    private _dlg: MatDialog,
    private _sb: MatSnackBar,
  ) { }

  ngOnInit(): void {
    const ftag = `ngOnInit(),`;
    if (this.model.targetType === CommentModel.Target.comment) {
      this.commentAdding = this.model.createComment();
    }
    console.log(ftag, 'model=', this.model);
  }

  async onClickSubmit() {
    const ftag = `onClickSubmit(),`;
    try {
      // https://tktk.crazyupinc.com:1295/theenm/p/pdf?pageNo=49
      if (this._api.me.sanctioned === Cd.YN.Y) {
        DlgUtil.showConfirm(this._dlg, {
          title: `제재 상태입니다.`,
          okBtnColor: 'primary',
          showCancel: Cd.YN.N,
        });
        return;
      }
      this.isLoading = true;
      const res = await this._api.reqCommentCmd('comment_create', this.model.getAttrs());
      this.isLoading = false;
      console.log(ftag, 'res=', res);
      if (res.error) {
        DlgUtil.showIfErrMsg(this._dlg, res);
        return;
      }
      this.on_changed.emit(res.result);
      DlgUtil.showSnack(this._sb, `댓글이 추가되었습니다.`);
    } catch (err) {
      this.isLoading = false;
      console.log(ftag, 'err=', err);
    }
  }

  get me(): UserModel {
    return this._api.me;
  }

  onClickInput() {
    DlgUtil.confirmLogin(this._api, this._dlg, `댓글 작성 하시려면 로그인 해주세요. \n로그인 하시겠습니까?`);
    // if (!this.me) {
    //   const ref = DlgUtil.showConfirm(this._dlg, {
    //     title: `댓글 작성 하시려면 로그인 해주세요. \n로그인 하시겠습니까?`,
    //     okBtnColor: 'primary',
    //     showCancel: Cd.YN.Y,
    //   });
    //   ref.afterClosed().subscribe(result => {
    //     // console.log(ftag, 'result=', result);
    //     if (result) {
    //       this._api.config.gotoLogin();
    //     }
    //   });
    // }
  }

}
