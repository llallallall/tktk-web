import { Component, Input, OnInit } from '@angular/core';
import { PostModel } from 'src/app/models/posts/post.model';
import { fadeIn } from 'src/app/share/animations/fade-in.animation';

@Component({
  selector: 'app-palist-item-img',
  templateUrl: './palist-item-img.component.html',
  animations: [fadeIn,],
})
export class PalistItemImgComponent implements OnInit {

  @Input() model: PostModel;

  constructor() { }

  ngOnInit(): void {
    const ftag = `ngOnInit(),`;
    // console.log(ftag, 'model=', this.model);    
  }

  get imagePath(): string {
    if (this.model.imageId) {
      return this.model.getImagePath(this.model.imageId);
    }
  }


}
