import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { CommentModel } from 'src/app/models/posts/comment.model';
import { CommentParam } from 'src/app/models/posts/comment.param';
import { PostModel } from 'src/app/models/posts/post.model';
import { UserModel } from 'src/app/models/users/user-model';
import { ApiService } from 'src/app/service/api.service';
import { UsersService } from 'src/app/service/users.service';
import { fadeIn } from 'src/app/share/animations/fade-in.animation';

@Component({
  selector: 'app-post-comment-list',
  templateUrl: './post-comment-list.component.html',
  styleUrls: ['./post-comment-list.component.scss',],
  animations: [fadeIn,],
})
export class PostCommentListComponent implements OnInit {

  @Input() postModel: PostModel;
  qp = new CommentParam();
  isLoading = false;
  items: CommentModel[] = [];

  constructor(
    private _api: ApiService,
    private _users: UsersService,
  ) { }

  ngOnInit(): void {
    const ftag = `ngOnInit(),`;
    this.qp.initQp();
    this.qp.targetType = CommentModel.Target.post;
    this.qp.targetIdx = this.postModel.objectId;

    // this.loadItems();
  }

  get me(): UserModel {
    return this._api.me;
  }

  async loadItems() {
    const ftag = `loadItems(),`;
    try {
      this.isLoading = true;
      const res = await this._api.reqCommentCmd('comment_list', {
        queryParams: this.qp.getAttrs(),
      })
      this.isLoading = false;
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

  onPageEvent(event: PageEvent) {
    const ftag = `onPageEvent(),`;
    if (this.isLoading) {
      return;
    }
    // console.log(ftag, 'event=', event);
    this.qp.pageSize = event.pageSize;
    this.qp.pageNo = event.pageIndex;
    this.loadItems();
  }

  ngOnChanges(changes: SimpleChanges): void {
    const ftag = `ngOnChanges(),`;
    console.log(ftag, 'changes=', changes);   
    if (changes.postModel) {
      this.loadItems();
    } 
  }

}
