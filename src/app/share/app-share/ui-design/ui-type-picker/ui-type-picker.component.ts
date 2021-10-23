import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { fadeIn } from 'src/app/share/animations/fade-in.animation';
import { UserModel } from 'src/app/models/users/user-model';
import { SiteModel } from 'src/app/models/site/site.model';

@Component({
  selector: 'app-ui-type-picker',
  templateUrl: './ui-type-picker.component.html',
  animations: [fadeIn,],
})
export class UiTypePickerComponent implements OnInit {

  @Input() code: string;
  @Input() items: any[] = [
    {
      code: SiteModel.UiType.ut_a,
      name: '테스트 테마 A',
    },
    {
      code: SiteModel.UiType.ut_b,
      name: '테스트 테마 B',
    },
    {
      code: SiteModel.UiType.ut_c,
      name: '테스트 테마 C',
    },
  ];
  @Input() disabled = false;
  @Input() pickerMode = true;
  @Input() allName = `전체`;
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
