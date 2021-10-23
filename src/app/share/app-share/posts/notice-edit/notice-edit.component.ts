import { Component, OnInit, Input, Output, EventEmitter, HostListener, AfterViewInit, ElementRef } from '@angular/core';
import { fadeIn } from 'src/app/share/animations/fade-in.animation';
import { PostModel } from 'src/app/models/posts/post.model';
import { CategoryService } from 'src/app/service/category.service';
import Editor from '@toast-ui/editor';
import { DomSanitizer } from '@angular/platform-browser';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as _ from 'lodash';


@Component({
  selector: 'app-notice-edit',
  templateUrl: './notice-edit.component.html',
  animations: [fadeIn,],
})
export class NoticeEditComponent implements OnInit {

  @Input() model: PostModel;
  @Output() on_changed = new EventEmitter();
  @Output() on_editor_created = new EventEmitter();
  isLoading = false;
  editor: Editor;
  hashtag: string;
  // changedHashtags = false;


  constructor(
    private _category: CategoryService,
    private _sanitizer: DomSanitizer,
    private _dlg: MatDialog,
    private _sb: MatSnackBar,
  ) { }

  ngOnInit(): void {
    const ftag = `ngOnInit(),`;
    this.model.siteIdx = this.model.siteIdx || this._category._api.siteIdx;
    console.log(ftag, 'model=', this.model);
    // this.setEditor();
  }

  onEditorCreated($event: Editor) {
    const ftag = `onEditorCreated(),`;
    console.log(ftag, '$event=', $event);
    this.editor = $event;

    // if (this.model.galleryIdx) {
    //   this.editor.show();
    // } else {
    //   this.editor.hide();
    // }
    this.on_editor_created.emit(this.editor);
  }

  onEdtorCmd($event) {
    const ftag = `onEdtorCmd(),`;
    console.log(ftag, '$event=', $event);
    // this.onClickCmd($event.target, $event.cmd);
  }

  on_changed_display($event: string) {
    const ftag = `on_changed_display(),`;
    console.log(ftag, '$event=', $event);
    this.model.display = $event;
  }

  async on_changed_category($event: string) {
    const ftag = `on_changed_category(),`;
    try {
      console.log(ftag, '$event=', $event);
      this.model.categoryIdx = $event;
      this.model.categoryModel = this._category.getCategoryModel(this.model.categoryIdx);
      this.isLoading = true;
      await this._category.loadGalleryList(this.model.categoryModel);
      this.model.galleryIdx = null;
      this.editor.hide();
      this.isLoading = false;

    } catch (err) {
      this.isLoading = false;
      console.log(ftag, 'err=', err);
    }
  }

  on_changed_gallery($event) {
    const ftag = `on_changed_gallery(),`;
    console.log(ftag, '$event=', $event);
    this.model.galleryIdx = $event;
    this.editor.show();
  }

  onAddHashtag() {
    this.hashtag = _.trim(this.hashtag);
    if (!this.hashtag) {
      return;
    }
    this.model.hashtags.push(this.hashtag);
    this.model.hashtags = _.uniq(this.model.hashtags);
    this.hashtag = null;
    this.model.changedHashtags = true;
  }

  onRmoveHashtag(hashtag: string) {
    const ftag = `onRmoveHashtag((${hashtag}),`;
    
    _.remove(this.model.hashtags, function (n) {
      return n === hashtag;
    });
    console.log(ftag, 'hashtags=', this.model.hashtags);
    this.model.changedHashtags = true;
  }

}
