import { Component, Input, OnInit } from '@angular/core';
import { fadeIn } from 'src/app/share/animations/fade-in.animation';

@Component({
  selector: 'app-items-load-guide',
  templateUrl: './items-load-guide.component.html',
  animations: [fadeIn,],
})
export class ItemsLoadGuideComponent implements OnInit {

  @Input() items = [];
  @Input() isLoading = false;
  @Input() msg_wait = `잠시만 기다려 주세요 ...`;
  @Input() msg_empty = `항목이 없습니다.`;

  constructor() { }

  ngOnInit(): void {
    const ftag = `ngOnInit(),`;
    console.log(ftag, 'items=', this.items);   
    console.log(ftag, 'isLoading=', this.isLoading);   
  }

}
