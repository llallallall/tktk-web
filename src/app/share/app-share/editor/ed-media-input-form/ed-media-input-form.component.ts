import { Component, ElementRef, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import Editor from '@toast-ui/editor';
import { FileResource } from 'src/app/models/base/file-resource';
import { ApiService } from 'src/app/service/api.service';
import DlgUtil from 'src/app/utils/dlg.util';
import EditorUtil from 'src/app/utils/editor.util';

@Component({
  selector: 'app-ed-media-input-form',
  templateUrl: './ed-media-input-form.component.html',
  styleUrls: ['./ed-media-input-form.component.scss',],
  styles: [
  ]
})
export class EdMediaInputFormComponent implements OnInit {

  @Input() data: {
    trigger: ElementRef,
    editor: Editor,
    fileClass: string,
    resourceIdx: string,
  };
  @Output() on_changed = new EventEmitter();

  isLoading = false;
  currentFile?: File;
  progress = 0;
  message = '';

  fileName: string = '파일을 선택해 주세요.';
  imageUrl: string;
  youtubeId: string;

  constructor(
    private _api: ApiService,
    private _dlg: MatDialog,
  ) { }

  ngOnInit(): void {
  }

  selectFile(event: any): void {
    if (event.target.files && event.target.files[0]) {
      const file: File = event.target.files[0];
      this.currentFile = file;
      this.fileName = this.currentFile.name;
    } else {
      this.fileName = '파일을 선택해 주세요.';
    }
  }

  upload(): void {
  }

  onClickAddVideo() {
    if (!this.youtubeId) {
      return;
    }
    EditorUtil.onAddYtId(this.data.editor, this.youtubeId);
    this.on_changed.emit({
      youtubeId: this.youtubeId,
    });
  }

  onClickAddImageUrl() {
    if (!this.imageUrl) {
      return;
    }
    EditorUtil.onAddImageId(this.data.editor, this.imageUrl);
    this.on_changed.emit({
      imageUrl: this.imageUrl,
    });

  }

  async onClickAddImageUpload() {
    const ftag = `onClickAddImageUpload(),`;
    try {

      if (!this.currentFile) {
        return;
      }

      this.isLoading = true;
      // const resourceIdx = this.model.objectId ? this.model.objectId : `undefined_post_idx`;
      const res = await this._api.reqUploadResource(this.currentFile, this.data.fileClass, this.data.resourceIdx);
      this.isLoading = false;
      console.log(ftag, 'res=', res);
      if (res.error) {
        DlgUtil.showErrIfMsg(this._dlg, res.error);
        return;
      }
      if (res.result) {
        const fr = new FileResource(res.result);
        EditorUtil.onAddImageId(this.data.editor, fr.imgPath);
        this.on_changed.emit({
          resourceIdx: fr.resourceIdx,
          imageId: fr.fileId,
        });
      }
    } catch (err) {
      this.isLoading = false;
      console.log(ftag, 'err=', err);
    }

  }


}
