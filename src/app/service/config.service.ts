import { Injectable } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { UserModel } from '../models/users/user-model';
// import { UrlModel } from '../models/url-model';
import { environment } from 'src/environments/environment';
import { SiteModel } from '../models/site/site.model';


@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  loginBackPath?: string;
  // userModel?: UserModel;
  // siteId?: string;

  siteModel: SiteModel;

  constructor(
    public _location: Location,
    public router: Router,
  ) { }

  get appName(): string {
    return environment.appName;
  }

  private deriveQualifiedKey(key: string): string {
    if (this.siteModel) {
      return `${environment.project}-${this.siteModel.siteId}-${environment.clientType}-${key}`; //APP_NAME + key;
    }
    return `${environment.project}-admin-${key}`; //APP_NAME + key;    
  }

  setItem(key: string, value: Object) {
    // console.log('addItem(), key=', key, value);
    return localStorage.setItem(this.deriveQualifiedKey(key), JSON.stringify(value));
  }

  removeItem(key: string) {
    // console.log('removeItem(), key=', key);
    return localStorage.removeItem(this.deriveQualifiedKey(key));
  }

  getItem(key: string) {
    const ret = localStorage.getItem(this.deriveQualifiedKey(key));
    return JSON.parse(ret!);
  }

  public get tokenInfo() {
    return this.getItem('token_info');
  }

  public set tokenInfo(value) {
    this.setItem('token_info', value);
  }

  public get userClass(): string {
    return this.getItem('userClass') || UserModel.UserClass.client;
  }

  public set userClass(value: string) {
    this.setItem('userClass', value);
  }

  get rememberMe(): boolean {
    return this.getItem('rememberMe');
  }

  set rememberMe(value: boolean) {
    this.setItem('rememberMe', value);
  }

  get rememberAuthId(): string {
    return this.getItem('rememberAuthId');
  }

  set rememberAuthId(value: string) {
    this.setItem('rememberAuthId', value);
  }

  get rememberEmail(): string {
    return this.getItem('rememberEmail');
  }

  set rememberEmail(value: string) {
    this.setItem('rememberEmail', value);
  }

  public get userEmail(): string {
    return this.getItem('userEmail');
  }

  public set userEmail(value: string) {
    this.setItem('userEmail', value);
  }

  public get serverUrl() {
    return environment.apiServerUrl;
  }

  // public get isSystemAdmin(): boolean {
  //   const ftag = `isSystemAdmin(${this.userClass}),`;
  //   if (!this.tokenInfo || !this.userModel) {
  //     return false;
  //   }
  //   // console.log(ftag);
  //   if (this.userModel.userClass === UserModel.UserClass.system) {
  //     return true;
  //   }
  //   return false;
  // }

  // public get isManagerAdmin(): boolean {
  //   if (!this.tokenInfo) {
  //     return false;
  //   }
  //   if (this.userClass === UserModel.UserClass.admin || this.userClass === UserModel.UserClass.system) {
  //     return true;
  //   }
  //   return false;
  // }

  goBack() {
    this._location.back();
  }

  gotoLogin(restorePath = true) {
    const ftag = `gotoLogin(${this.currentUrl}),`;
    // console.log(ftag);
    if (restorePath && this.currentUrl && this.currentUrl !== '/p/a/sign-in') {
      this.loginBackPath = this.router.url;
    } else {
      this.loginBackPath = null;
    }
    if (this.siteModel.siteId) {
      this.router.navigate([`/${this.siteModel.siteId}/p/a/sign-in`]);
    }

  }

  gotoHome() {
    if (this.siteModel.siteId) {
      this.router.navigate([`/${this.siteModel.siteId}`]);
    }
  }

  gotoSiteList() {
    this.router.navigate([`/site-list`]);
  }


  get currentUrl(): string {
    const ftag = `currentUrl(),`;
    // console.log(ftag, 'url=', this._api.router.url.split('?')[0]);
    // const url = new URL(this.router.url);
    return this.router.url.split('?')[0];
    // const m = new UrlModel();
    // // console.log(ftag, 'url=', this.router.url);
    // m.parse(this.router.url);
    // return m.pathname;
  }

}
