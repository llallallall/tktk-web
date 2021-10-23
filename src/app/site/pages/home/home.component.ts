import { Component, OnInit } from '@angular/core';
import { MatDrawerMode } from '@angular/material/sidenav';
import { NavigationEnd } from '@angular/router';
import { SiteModel } from 'src/app/models/site/site.model';
import { UserModel } from 'src/app/models/users/user-model';
import { ApiService } from 'src/app/service/api.service';
import { MenuService } from 'src/app/service/menu.service';
import { SideNavService } from 'src/app/service/side-nav.service';
import { fadeIn } from 'src/app/share/animations/fade-in.animation';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss',],
  animations: [fadeIn,],
})
export class HomeComponent implements OnInit {

  isLoading = false;

  constructor(
    private sideNav: SideNavService,
    private _api: ApiService,
    private _menu: MenuService,
  ) { }

  ngOnInit(): void {
    this.subscribeNavi();
  }

  async subscribeNavi() {
    const ftag = `subscribeNavi(),`;
    try {
      this._api.router.events
        .subscribe((event: any) => {
          // console.log(ftag, 'event=', event);
          if (event instanceof NavigationEnd) {
            // console.log(ftag, 'url=', event.url);
            this._menu.onNavigationEnd(event.url);
          }
        });
      // console.log(ftag, 'currentUrl=', this.config.currentUrl);
      this._menu.onNavigationEnd(this._api.currentUrl);
      this.isLoading = true;
      await this.reqGetMeIfNeed();
      this.isLoading = false;
    } catch (err) {
      console.log(ftag, 'err=', err);
    }
  }

  // https://crazyup.monday.com/boards/1691140764/views/35157687/pulses/1714539854
  async reqGetMeIfNeed() {
    const ftag = `reqGetMeIfNeed(),`;
    try {
      if (!this._api.config.tokenInfo) {
        return;
      }
      this.isLoading = true;
      await this._api.reqGetMeIfNeed();
      this.isLoading = false;
      if (this._api.me) {
        if (this._api.me.state === UserModel.State.dormant) {
          this._api.config.tokenInfo = null;
          this._api.me = null;
        }
      }
    } catch (err) {
      this.isLoading = false;
      console.log(ftag, 'err=', err);
    }
  }

  get siteModel(): SiteModel {
    return this._api.siteModel;
  }

  get opened(): boolean {
    return this.sideNav.opened;
  }

  get isWide(): boolean {
    return this.sideNav.isWide;
  }

  get mode(): MatDrawerMode {
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

  get me(): UserModel {
    return this._api.me;
  }

  onClickLogin() {
    this._api.navigate('/p/a/sign-in');
  }

  onClickMe() {
    this._api.navigate('/p/h/me');
  }

}
