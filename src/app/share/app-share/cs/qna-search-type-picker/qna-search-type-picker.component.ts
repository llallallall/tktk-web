import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { fadeIn } from 'src/app/share/animations/fade-in.animation';

@Component({
  selector: 'app-qna-search-type-picker',
  templateUrl: './qna-search-type-picker.component.html',
  animations: [fadeIn,],
})
export class QnaSearchTypePickerComponent implements OnInit {

  @Input() code: string;
  @Input() items: any[] = [
    {
      code: 'title',
      name: '제목',
    },
    {
      code: 'qclass',
      name: '질문유형',
    },
    {
      code: 'nickname',
      name: '닉네임',
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


}
