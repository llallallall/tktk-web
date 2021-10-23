import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { fadeIn } from 'src/app/share/animations/fade-in.animation';


@Component({
  selector: 'app-cu-base-picker',
  templateUrl: './cu-base-picker.component.html',
  animations: [fadeIn,],
})
export class CuBasePickerComponent implements OnInit {

  @Input() code: string;
  @Input() items: any[] = [
    {
      code: 'code0',
      name: 'name0',
    },
    {
      code: 'code1',
      name: 'name1',
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
