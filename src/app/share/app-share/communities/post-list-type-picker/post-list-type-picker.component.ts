import { ThisReceiver } from '@angular/compiler';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatButtonToggleChange } from '@angular/material/button-toggle';
import { Cd } from 'src/app/models/codes/cd';
import { PostModel } from 'src/app/models/posts/post.model';

@Component({
  selector: 'app-post-list-type-picker',
  templateUrl: './post-list-type-picker.component.html',
  styles: [
  ]
})
export class PostListTypePickerComponent implements OnInit {

  @Input() code: string;
  @Output() on_changed = new EventEmitter();

  items = [
    {
      code: Cd.All,
      iconId: 'view_list',
    },
    {
      code: PostModel.MediaType.image,
      iconId: 'image',
    },
    {
      code: PostModel.MediaType.video,
      iconId: 'smart_display',
    },
  ];

  constructor() { }

  ngOnInit(): void {
  }

  onChange($event: MatButtonToggleChange) {
    const ftag = `onChange(),`;
    console.log(ftag, '$event=', $event);
    this.on_changed.emit($event.value);
  }

}
