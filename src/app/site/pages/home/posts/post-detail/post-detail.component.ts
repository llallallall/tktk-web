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

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  animations: [fadeIn,],
})
export class PostDetailComponent implements OnInit {

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
      this.isLoading = false;
      if (this.postModel) {
        // this.editor.setMarkdown(this.postModel.content);
        this.commentAdding = this.postModel.createComment();
      }
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

}
