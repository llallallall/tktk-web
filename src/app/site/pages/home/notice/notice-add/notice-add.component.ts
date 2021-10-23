import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/service/api.service';
import { fadeIn } from 'src/app/share/animations/fade-in.animation';
import * as _ from 'lodash';
import { PostModel } from 'src/app/models/posts/post.model';
import { CategoryService } from 'src/app/service/category.service';
import { UsersService } from 'src/app/service/users.service';
import { PostService } from 'src/app/service/post.service';
import { GalleryModel } from 'src/app/models/communities/gallery.model';
import { Cd } from 'src/app/models/codes/cd';
import Editor from '@toast-ui/editor';
import DlgUtil from 'src/app/utils/dlg.util';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-notice-add',
  templateUrl: './notice-add.component.html',
  animations: [fadeIn,],
})
export class NoticeAddComponent implements OnInit {

  isLoading = false;
  galleryModel: GalleryModel;
  // qp = new PostParam();
  model = new PostModel({
    display: Cd.YN.Y,
  });
  editor: Editor;


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
    this.parseParams();
  }

  parseParams() {
    const ftag = `parseParams()`;
    this._aRoute.queryParams.subscribe((querys) => {
      console.log(ftag, 'querys=', querys);
      // const q = _.clone(querys);
      // this.qp = new PostParam(q);
      // console.log(ftag, 'pageParams=', this.pageParams.getAttrs());
      // console.log(ftag, 'searchWord=', this.pageParams.get('searchWord'));
      this.loadModel(querys.galleryIdx);
    });
  }

  async loadModel(galleryIdx: string) {
    const ftag = `loadModel(${galleryIdx}),`;
    try {
      this.isLoading = true;
      this.galleryModel = await this._category.loadGalleryIfNeed(galleryIdx);
      this.isLoading = false;
      this.model.categoryIdx = this.galleryModel.categoryIdx;
      this.model.galleryIdx = this.galleryModel.objectId;
    } catch (err) {
      this.isLoading = false;
      console.log(ftag, 'err=', err);
    }
  }

  on_editor_created($event) {
    const ftag = `on_editor_created(),`;
    console.log(ftag, '$event=', $event);
    this.editor = $event;
  }

  onClickCancel() {
    const ftag = `onClickCancel(),`;
    console.log(ftag, 'model=', this.model.getChanged());
    if (this.model.hasChanged()) {
      const ref = DlgUtil.showConfirm(this._dlg, {
        title: `입력한 내용은 저장되지 않습니다.`,
        okBtnColor: 'primary',
      });
      ref.afterClosed().subscribe(result => {
        // console.log(ftag, 'result=', result);
        if (result) {
          this._api.goBack();
        }
      });
    } else {
      this._api.goBack();
    }
  }

  async onClickSubmit() {
    const ftag = `onClickSubmit(),`;
    try {
      const mk = this.editor.getMarkdown();
      console.log(ftag, 'mk=', mk);
      // const html = this.editor.getHTML();
      // console.log(ftag, 'html=', html);
      // this.editor.setHTML(mk);
      this.model.content = mk;
      this.model.updateMediaType();

      if (this.model.validateErr) {
        console.log(ftag, 'model=', this.model);
        DlgUtil.showSnack(this._sb, this.model.validateErr);
        // DlgUtil.showErr(this._dlg, 'test');
        return;
      }
      // this.model.location = 'main';
      this.model.noticeLocation = Cd.NoticeLocation.gallery;

      console.log(ftag, 'model=', this.model.getAttrs());
      this.isLoading = true;
      const res = await this._api.reqNoticeCmd('notice_create', this.model.getAttrs());
      this.isLoading = false;
      if (res.error) {
        DlgUtil.showErrIfMsg(this._dlg, res.error);
        return;
      }
      if (res.result) {
        this.model = new PostModel(res.result);
        const ref = DlgUtil.showConfirm(this._dlg, {
          title: `등록이 완료되었습니다.`,
          okBtnColor: 'primary',
          showCancel: Cd.YN.N,
        });
        ref.afterClosed().subscribe(result => {
          // console.log(ftag, 'result=', result);
          this._api.goBack();
        });
      }
    } catch (err) {
      this.isLoading = false;
      console.log(ftag, 'err=', err);
    }
  }



}
