import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostParam } from 'src/app/models/posts/post.param';
import { ApiService } from 'src/app/service/api.service';
import { fadeIn } from 'src/app/share/animations/fade-in.animation';
import * as _ from 'lodash';
import { PostModel } from 'src/app/models/posts/post.model';
import { CategoryService } from 'src/app/service/category.service';
import { UsersService } from 'src/app/service/users.service';
import { CommentParam } from 'src/app/models/posts/comment.param';
import { CommentModel } from 'src/app/models/posts/comment.model';
import { PageEvent } from '@angular/material/paginator';


@Component({
  selector: 'app-sr-item-comment',
  templateUrl: './sr-item-comment.component.html',
  styleUrls: ['../../search-result.component.scss',],
  animations: [fadeIn,],
})
export class SrItemCommentComponent implements OnInit {

  @Input() commentModel: CommentModel;

  constructor(
    private _api: ApiService,
  ) { }

  ngOnInit(): void {
    const ftag = `ngOnInit(),`;
    console.log(ftag, 'commentModel=', this.commentModel);
  }

  onClickPost() {
    this._api.navigate('/p/h/posts/detail', {
      queryParams: {
        objectId: this.commentModel.postModel.objectId,
      }
    });

  }

}
