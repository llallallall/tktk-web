import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PostParam } from 'src/app/models/posts/post.param';
import { fadeIn } from 'src/app/share/animations/fade-in.animation';


@Component({
  selector: 'app-sr-main-type-picker',
  templateUrl: './sr-main-type-picker.component.html',
  animations: [fadeIn,],
})
export class SrMainTypePickerComponent implements OnInit {

  @Input() code: string;
  @Input() items: any[] = [
    {
      code: PostParam.SrMain.integrated,
      name: PostParam.SrMainName.integrated,
    },
    {
      code: PostParam.SrMain.post,
      name: PostParam.SrMainName.post,
    },
    {
      code: PostParam.SrMain.comment,
      name: PostParam.SrMainName.comment,
    },
  ];
  @Input() allName = `전체`;
  @Input() disabled = false;
  @Input() pickerMode = false;
  @Output() on_changed = new EventEmitter();


  constructor(
    // public translate: TranslateService,
  ) { }

  ngOnInit(): void {
    const ftag = `ngOnInit(),`;
    // console.log(ftag, 'doctorIdx=', this.doctorIdx, this.items);
  }

  onModelChange(arg) {
    const ftag = `onModelChange(${arg}),`;
    // console.log(ftag);    
    this.on_changed.emit(arg);
  }

  onClickItem(item) {
    this.on_changed.emit(item.code);
  }


}
