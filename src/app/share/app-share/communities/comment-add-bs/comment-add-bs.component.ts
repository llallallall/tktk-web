import { Component, Inject, OnInit } from '@angular/core';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { CommentModel } from 'src/app/models/posts/comment.model';
import { fadeIn } from 'src/app/share/animations/fade-in.animation';

@Component({
  selector: 'app-comment-add-bs',
  templateUrl: './comment-add-bs.component.html',
  animations: [fadeIn,],
})
export class CommentAddBsComponent implements OnInit {

  constructor(
    private _bsRef: MatBottomSheetRef<CommentAddBsComponent>,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: {
      commentModel: CommentModel,
    },
  ) { }

  ngOnInit(): void {
    const ftag = `ngOnInit(),`;
    console.log(ftag, 'data=', this.data);
  }

  on_changed_data($event) {
    const ftag = `on_changed_data(),`;
    // console.log(ftag, '$event=', $event);   
    this._bsRef.dismiss($event);
  }

  on_comment_added($event) {
    const ftag = `on_comment_added(),`;
    // console.log(ftag, '$event=', $event);   
    this._bsRef.dismiss($event);
  }

}
