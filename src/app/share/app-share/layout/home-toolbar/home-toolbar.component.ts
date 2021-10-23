import { Component, OnInit } from '@angular/core';
import { SideNavService } from 'src/app/service/side-nav.service';
import { fadeIn } from 'src/app/share/animations/fade-in.animation';

@Component({
  selector: 'app-home-toolbar',
  templateUrl: './home-toolbar.component.html',
  animations: [fadeIn,],
})
export class HomeToolbarComponent implements OnInit {

  constructor(
    private sideNav: SideNavService,
  ) { }

  ngOnInit(): void {
  }

  get opened(): boolean {
    return this.sideNav.opened;
  }

  get isWide(): boolean {
    return this.sideNav.isWide;
  }

  get mode(): string {
    return this.sideNav.mode;
  }

  onSideNavOpened(arg) {
    const ftag = `onSideNavOpened(),`;
    // console.log(ftag, 'arg=', arg);
    this.sideNav.opened = true;
  }

  onSideNavClosed(arg) {
    const ftag = `onSideNavClosed(),`;
    // console.log(ftag, 'arg=', arg);
    this.sideNav.opened = false;
  }

  onClickSideNav() {
    this.sideNav.opened = true;
  }


}
