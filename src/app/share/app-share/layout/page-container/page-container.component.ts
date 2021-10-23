import { Component, OnInit } from '@angular/core';
import { fadeIn } from 'src/app/share/animations/fade-in.animation';

@Component({
  selector: 'app-page-container',
  templateUrl: './page-container.component.html',
  animations: [fadeIn,],
})
export class PageContainerComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
