import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as _ from 'lodash';
import { MediaChange, MediaObserver } from '@angular/flex-layout';
import { Subscription, Observable } from 'rxjs';
import { BreakpointObserver, BreakpointState, Breakpoints } from '@angular/cdk/layout';
import { MatDrawerMode } from '@angular/material/sidenav';

@Injectable({
  providedIn: 'root'
})
export class SideNavService {

  opened = true;
  watcher: Subscription;
  media: MediaChange;

  constructor(
    private breakpointObserver: BreakpointObserver,
    public mediaObserver: MediaObserver,
  ) {
    this.startObserve();
  }

  startObserve() {
    const ftag = `startObserve(),`;
    if (this.watcher) {
      return;
    }
    this.watcher = this.breakpointObserver.observe([
      Breakpoints.Handset,
      Breakpoints.Tablet,
      Breakpoints.Web,
      // Breakpoints.WebLandscape,
      // Breakpoints.XSmall,
      // Breakpoints.Small,
      // Breakpoints.Medium,
      // '(max-width: 1200px)',
      // Breakpoints.HandsetPortrait
    ]).subscribe(result => {
      if (result.matches) {
        // console.log(ftag, 'result=', result);
        if (this.isWide) {
          this.opened = this.isWide;
        } else {
          this.opened = false;
        }
        
        // console.log(ftag, 'opened=', this.opened);
      }
    });
  }

  get isWide(): boolean {
    return this.breakpointObserver.isMatched(Breakpoints.Web);
  }

  get mode(): MatDrawerMode {
    if (this.isWide) {
      return 'side';
    }
    return 'over';
    // return 'side';
  }


  toggleSidebar() {
    this.opened = !this.opened;
    // return true;
  }

} // end of class
