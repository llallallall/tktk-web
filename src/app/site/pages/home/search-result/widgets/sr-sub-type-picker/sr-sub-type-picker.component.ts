import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PostParam } from 'src/app/models/posts/post.param';
import { fadeIn } from 'src/app/share/animations/fade-in.animation';


@Component({
  selector: 'app-sr-sub-type-picker',
  templateUrl: './sr-sub-type-picker.component.html',
  animations: [fadeIn,],
})
export class SrSubTypePickerComponent implements OnInit {

  @Input() code: string;
  @Input() items: any[] = [
    {
      code: PostParam.SrSub.tc,
      name: PostParam.SrSubName.tc,
    },
    {
      code: PostParam.SrSub.title,
      name: PostParam.SrSubName.title,
    },
    {
      code: PostParam.SrSub.content,
      name: PostParam.SrSubName.content,
    },
    {
      code: PostParam.SrSub.tag,
      name: PostParam.SrSubName.tag,
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
