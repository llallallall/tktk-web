import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { fadeIn } from 'src/app/share/animations/fade-in.animation';


@Component({
  selector: 'app-search-user-filter',
  templateUrl: './search-user-filter.component.html',
  animations: [fadeIn,],
})
export class SearchUserFilterComponent implements OnInit {

  @Input() code: string;
  @Input() items: any[] = [
    {
      code: 'name',
      name: '이름',
    },
    {
      code: 'userId',
      name: '아이디',
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
