import { Component, Input, OnInit } from '@angular/core';
import { PostModel } from 'src/app/models/posts/post.model';
import { fadeIn } from 'src/app/share/animations/fade-in.animation';

@Component({
  selector: 'app-palist-item-notice',
  templateUrl: './palist-item-notice.component.html',
  animations: [fadeIn,],
})
export class PalistItemNoticeComponent implements OnInit {

  @Input() model: PostModel;

  constructor() { }

  ngOnInit(): void {
    const ftag = `ngOnInit(),`;
    // console.log(ftag, 'model=', this.model);
  }

  get iconName(): string {
    switch (this.model.mediaType) {
      case PostModel.MediaType.image: return 'image';
      case PostModel.MediaType.video: return 'smart_display';
    }
  }

}
