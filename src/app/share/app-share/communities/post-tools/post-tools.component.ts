import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Cd } from 'src/app/models/codes/cd';
import { EvalData } from 'src/app/models/posts/eval-data';
import { EvaluateModel } from 'src/app/models/posts/evaluate.model';
import { PostModel } from 'src/app/models/posts/post.model';
import { UserModel } from 'src/app/models/users/user-model';
import { ApiService } from 'src/app/service/api.service';
import { PostService } from 'src/app/service/post.service';
import { fadeIn } from 'src/app/share/animations/fade-in.animation';
import DlgUtil from 'src/app/utils/dlg.util';

@Component({
  selector: 'app-post-tools',
  templateUrl: './post-tools.component.html',
  animations: [fadeIn,],
})
export class PostToolsComponent implements OnInit {

  @Input() postModel: PostModel;
  isLoading = false;

  constructor(
    private _api: ApiService,
    private _post: PostService,
    private _dlg: MatDialog,
    private _sb: MatSnackBar,
  ) { }

  ngOnInit(): void {
    this.loadModel();
  }

  get evalData(): EvalData {
    return this.postModel.evalData;
  }

  async loadModel() {
    const ftag = `loadModel(),`;
    try {
      console.log(ftag, 'postModel=', this.postModel);


      if (!this.postModel.evalData) {
        this.isLoading = true;
        await this._post.loadEvalData(this.postModel);
        this.isLoading = false;
        // console.log(ftag, 'postModel=', this.postModel);
        console.log(ftag, 'evalData=', this.evalData);
      }
    } catch (err) {
      this.isLoading = false;
      console.log(ftag, 'err=', err);
    }
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

  onClickReport() {

    // https://trello.com/c/Ch8p8yDg/79-좋아요-싫어요-공유-신고-기능-접근권한-문의
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

    if (this.evalData.reportIdx) {
      DlgUtil.showSnack(this._sb, `이미 신고한 상태입니다.`);
      return;
    }

    const ref = DlgUtil.showReport(this._dlg, this.postModel.createReport());
    ref.afterClosed().subscribe(result => {
      // console.log(ftag, 'result=', result);
      if (result) {
        this._post.loadEvalData(this.postModel);
      }
    });
  }

}
