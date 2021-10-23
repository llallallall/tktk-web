import { Component, OnInit, Input } from '@angular/core';
import { fadeIn } from 'src/app/share/animations/fade-in.animation';

@Component({
  selector: 'app-page-title',
  templateUrl: './page-title.component.html',
  styleUrls: ['./page-title.component.scss',],
  animations: [fadeIn,],
})
export class PageTitleComponent implements OnInit {

  @Input() title: string;
  @Input() isLoading = false;

  constructor() { }

  ngOnInit(): void {
  }

}
