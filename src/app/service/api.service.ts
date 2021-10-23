import { ErrorCode } from './../models/error-code.enum';
import { Injectable } from '@angular/core';
import { ConfigService } from './config.service';
import { HttpClient, HttpEvent, HttpHeaders } from '@angular/common/http';
import * as _ from 'lodash';
import { ModelStoreService } from './model-store.service';
import { UserModel } from '../models/users/user-model';
import { Observable } from 'rxjs';
import ProjectConfig from './project.config';
import { SiteModel } from '../models/site/site.model';
import { NavigationExtras } from '@angular/router';
import { StyleItem } from '../models/theme/style-item';
import { StyleDef } from '../models/theme/style-def';
import QueryParams from '../models/params/query.params';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  me: UserModel;
  dedicated_ips = [];

  constructor(
    public http: HttpClient,
    public config: ConfigService,
    public _store: ModelStoreService,
  ) {
  }

  get router() {
    return this.config.router;
  }

  get siteModel(): SiteModel {
    return this.config.siteModel;
  }

  get siteId(): string {
    return this.siteModel.siteId;
  }

  get siteIdx(): string {
    return this.siteModel?.objectId;
  }


  public onTokenInfo(data) {
    // console.log('onTokenInfo(), data' + data);
  }

  private reqHandle0(method: string, httpOptions: any, path: string, body: any = null) {
    const ftag = `reqHandle0(${path}),`;
    const url = this.config.serverUrl + '/' + path;
    // const url = 'chub/' + path;
    // console.log(ftag, 'url=', url);
    // console.log(ftag, 'httpOptions=', httpOptions);
    switch (method) {
      case 'GET':
        return this.http.get(url, httpOptions);
      case 'DELETE':
        return this.http.delete(url, httpOptions);
      case 'POST':
        return this.http.post(url, body, httpOptions);
      case 'PUT':
        return this.http.put(url, body, httpOptions);
    }
  }

  private reqHandle(method: string, path: string, body: any = null) {
    const ftag = `reqHandle(${path}),`;
    // console.log('reqHandle(), path=', path);
    // const tokenInfo = this.config.tokenInfo;
    // console.log('reqHandle(), tokenInfo=', tokenInfo);
    const httpOptions = { headers: this.headers };
    // console.log(ftag, 'headers=', httpOptions.headers);
    return this.reqHandle0(method, httpOptions, path, body);
  }

  public reqHttp(method: string, path: string, body: any = null) {
    const ftag = `reqHttp(${path}),`;
    return new Promise((resolve, reject) => {
      return Promise.resolve()
        .then(() => {
          return this.reqHandle(method, path, body);
        })
        .then((obs: any) => {
          // console.log(ftag, 'obs=', obs);
          obs.subscribe((res) => {
            // console.log('reqHttp(), res=', res);
            resolve(res);
          }, (err) => {
            // console.log('reqHttp(), err=', err);
            console.log(ftag, 'status=', err.status);
            console.log(ftag, 'currentUrl=', this.config.currentUrl);
            // if (err.status === 403) {
            //   this.config.gotoLogin();
            // } else if (err.error && err.error.code === ErrorCode.INVALID_SESSION_TOKEN) {
            //   this.config.gotoLogin();
            // }
            reject(err);
          });
        })
        .catch((err) => {
          console.log(ftag, 'err=', err);
        });
    });
  }

  uploadFile(path, file, name: string = null) {
    const ftag = `uploadFile(),`;

    return new Promise((resolve, reject) => {
      return Promise.resolve()
        .then(() => {
          // console.log('uploadFile(), file=', file);
          const formData: FormData = new FormData();
          formData.append('file', file, file.name);
          const url = this.config.serverUrl + '/' + path;
          const httpOptions = { headers: this.headers };
          return this.http.post(url, formData, httpOptions);
        })
        .then((obs: any) => {
          // console.log('uploadFile(), obs=', obs);
          obs.subscribe((res) => {
            // console.log('uploadFile(), res=', res);
            resolve(res);
          }, (err) => {
            console.log(ftag, 'err=', err);
            reject(err);
          });
        })
        .catch((err) => {
          console.log(ftag, 'err=', err);
        });
    });

  }

  uploadFile2(path, file, name: string = null) {
    // const formData: FormData = new FormData();
    // formData.append('file', file, file.name);

    // const upload$ = this.http.post('/api/upload', formData, {
    //   reportProgress: true,
    //   observe: 'events',
    // })


    return new Promise((resolve, reject) => {
      return Promise.resolve()
        .then(() => {
          // console.log('uploadFile(), file=', file);
          const formData: FormData = new FormData();
          formData.append('file', file, file.name);
          const url = this.config.serverUrl + '/' + path;
          const httpOptions = {
            headers: this.headers,
            // observe: 'events',
            // observe: 'body',
            // params?: HttpParams | {
            //     [param: string]: string | string[];
            // };
            reportProgress: true,
            // responseType: 'json',
          };
          return this.http.post(url, formData, httpOptions);
        })
        .then((obs: any) => {
          // console.log('uploadFile(), obs=', obs);
          obs.subscribe((res) => {
            console.log('uploadFile(), res=', res);
            resolve(res);
          }, (err) => {
            console.log('uploadFile(), err=', err);
            reject(err);
          });
        })
        .catch((err) => {
          console.log('uploadFile(), err=', err);
        });
    });
  }

  uploadBlob(path: string, blob: Blob) {
    const ftag = `uploadBlob(${path}),`;

    return new Promise((resolve, reject) => {
      return Promise.resolve()
        .then(() => {
          // console.log(ftag, 'blob=', blob);
          const formData: FormData = new FormData();
          formData.append('data', blob);
          const url = this.config.serverUrl + '/' + path;
          const httpOptions = { headers: this.headers };
          return this.http.post(url, formData, httpOptions);
        })
        .then((obs: any) => {
          // console.log('uploadFile(), obs=', obs);
          obs.subscribe((res) => {
            // console.log('uploadFile(), res=', res);
            resolve(res);
          }, (err) => {
            console.log('uploadFile(), err=', err);
            reject(err);
          });
        })
        .catch((err) => {
          console.log('uploadFile(), err=', err);
        });
    });
  }

  get headers(): HttpHeaders {
    const body: any = {
      'X-Crazy-Master-Key': ProjectConfig.server_config.masterKey,
      'X-Crazy-Client-Key': ProjectConfig.server_config.clientKey,
      'X-Crazy-REST-API-Key': ProjectConfig.server_config.apiKey,
    };
    if (this.siteIdx) {
      body['X-Crazy-siteIdx'] = this.siteIdx;
    }
    if (this.config.tokenInfo && this.config.tokenInfo.access_token) {
      body.Authorization = `Bearer ${this.config.tokenInfo.access_token}`;
    }
    return new HttpHeaders(body);
  }


  public reqGetFile(path: string, mediaType: string = null) {
    return new Promise((resolve, reject) => {
      return Promise.resolve()
        .then((server) => {
          const url = this.config.serverUrl + '/' + path;
          // console.log('reqGetFile(), url=', url);
          const httpOptions = {
            headers: new HttpHeaders({
              'X-Crazy-Master-Key': ProjectConfig.server_config.masterKey,
              'X-Crazy-Client-Key': ProjectConfig.server_config.clientKey,
              'X-Crazy-REST-API-Key': ProjectConfig.server_config.apiKey,
            })
          };
          return this.http.get(url, {
            responseType: 'blob',
            headers: httpOptions.headers,
          });
        })
        .then((res) => {
          return res.subscribe((data: any) => {
            // console.log('reqGetFile(), data=', data);
            resolve(data);
          }, (err) => {
            reject(err);
          });
        })
        .catch((err) => {
          console.log('reqGetFile(), err=', err);
          reject(err);
        });
    });
  }

  downloadFile(data: any, mediaType: string, ext: string, filename: string) {
    // const mediaType = 'text/csv';
    const a: any = document.createElement('a');
    a.setAttribute('style', 'display:none;');
    document.body.appendChild(a);
    const blob = new Blob([data], { type: mediaType });
    const url = window.URL.createObjectURL(blob);
    a.href = url;

    a.download = filename + '.' + ext;
    a.click();
  }


  public goBack() {
    this.config.goBack();
  }

  public get currentUrl(): string {
    return this.config.currentUrl;
  }

  public getFileUrl(path: string): string {
    return `${this.config.serverUrl}/files/get.file?path=${path}`;
  }

  // getModels(storeName: string): any {
  //   return this.modelStores.getModels(storeName) || [];
  // }

  // setModels(storeName: string, items: any) {
  //   this.modelStores.setModels(storeName, items || []);
  // }

  async reqCmd(path: string, command: string, body: any = {}): Promise<any> {
    const ftag = `reqCmd(${path}, ${command}),`;
    try {
      body.command = command;
      // console.log(ftag, 'body=', body);
      // console.log(ftag, 'siteIdx=', this.siteIdx);
      const res: any = await this.reqHttp('POST', path, body);
      // console.log(ftag, 'res=', res);
      // if (res.errorCode === ErrorCode.INVALID_SESSION_TOKEN) {
      //   this.config.gotoLogin();
      // }
      // if (res.error) {
      //   if (res.error.code === ErrorCode.INVALID_SESSION_TOKEN) {
      //     this.config.gotoLogin();
      //   }
      // }
      return res;
    } catch (err) {
      console.log(ftag, 'err=', err);
      throw err;
    }
  }

  async reqCodesCmd(command: string, body: any = {}): Promise<any> {
    const ftag = `reqCodesCmd(${command}),`;
    try {
      // console.log(ftag, 'body=', body);
      return await this.reqCmd('codes/cmd', command, body);
    } catch (err) {
      console.log(ftag, 'err=', err);
      throw err;
    }
  }


  async reqInstallCmd(command: string, body: any = {}): Promise<any> {
    const ftag = `reqInstallCmd(${command}),`;
    try {
      // console.log(ftag, 'body=', body);
      return await this.reqCmd('install/cmd', command, body);
    } catch (err) {
      console.log(ftag, 'err=', err);
      throw err;
    }
  }


  async reqPublicCmd(command: string, body: any = {}): Promise<any> {
    const ftag = `reqPublicCmd(${command}),`;
    try {
      // console.log(ftag, 'body=', body);
      return await this.reqCmd('public/cmd', command, body);
    } catch (err) {
      console.log(ftag, 'err=', err);
      throw err;
    }
  }


  async reqGetMeIfNeed(): Promise<any> {
    const ftag = `reqGetMeIfNeed(),`;
    try {
      if (this.me) {
        return this.me;
      }
      return this.reqGetMe();
    } catch (err) {
      console.log(ftag, 'err=', err);
      throw err;
    }
  }


  async reqGetMe(): Promise<any> {
    const ftag = `reqGetMe(),`;
    try {
      const res: any = await this.reqUsersCmd('req_me');
      // console.log(ftag, 'res=', res);
      if (res.error) {
        console.log(ftag, 'res=', res);
        if (res.error.message) {
          return;
        }
        return res;
      }
      if (res.result) {
        this.me = new UserModel(res.result);
        // console.log(ftag, 'me=', this.me);
        // console.log(ftag, 'state=', this.me.state);

      }
      return res;
    } catch (err) {
      console.log(ftag, 'err=', err);
      // this.config.gotoLogin();
      throw err;
    }
  }

  async reqGetSiteIfNeed(siteId: string): Promise<any> {
    const ftag = `reqGetSiteIfNeed(${siteId}),`;
    try {
      if (this.siteModel) {
        return;
      }
      return this.reqGetSite(siteId);
    } catch (err) {
      console.log(ftag, 'err=', err);
      throw err;
    }
  }


  async reqGetSite(siteId: string): Promise<any> {
    const ftag = `reqGetSite(${siteId}),`;
    try {
      const res = await this.reqSiteCmd('site_by_siteId', {
        siteId: siteId,
      });
      // console.log(ftag, 'res=', res);
      if (res.error) {
        return res.error;
      }
      if (res.result) {
        this.config.siteModel = new SiteModel(res.result);
        this.updateTheme();
      }
    } catch (err) {
      console.log(ftag, 'err=', err);
      this.config.gotoLogin();
      throw err;
    }
  }

  updateTheme() {
    const ftag = `updateTheme(),`;
    switch (this.siteModel.uiType) {
      case SiteModel.UiType.ut_a: {
        this.updateThemeStyles(StyleDef.ut_a);
        // document.documentElement.style.setProperty('--bg-test', '#111');
        break;
      }
      case SiteModel.UiType.ut_b: {
        this.updateThemeStyles(StyleDef.ut_b);
        // document.documentElement.style.setProperty('--bg-test', '#999');
        break;
      }
      case SiteModel.UiType.ut_c: {
        this.updateThemeStyles(StyleDef.ut_c);
        // document.documentElement.style.setProperty('--bg-test', '#555');
        break;
      }
    }
  }

  updateThemeStyles(items: StyleItem[]) {
    for (const item of items) {
      document.documentElement.style.setProperty(item.name, item.value);
    }
  }

  get isSys(): boolean {
    if (this.me) {
      return this.me.isSys;
    }
  }

  async reqUploadResource(file: File, fileClass: string, resourceIdx: string) {
    const ftag = `reqUploadResource(${file.name}, ${fileClass}, ${resourceIdx}),`;
    try {
      const res: any = await this.uploadFile(`media/file?siteIdx=${this.siteIdx}&fileClass=${fileClass}&resourceIdx=${resourceIdx}`, file);
      console.log(ftag, 'res=', res);
      return res;
    } catch (err) {
      console.log(ftag, 'err=', err);
      throw err;
    }
  }

  async reqUsersCmd(command: string, body: any = {}): Promise<any> {
    const ftag = `reqUsersCmd(${command}),`;
    try {
      // console.log(ftag, 'body=', body);
      return await this.reqCmd('user/cmd', command, body);
    } catch (err) {
      console.log(ftag, 'err=', err);
      throw err;
    }
  }

  async reqSiteCmd(command: string, body: any = {}): Promise<any> {
    const ftag = `reqSiteCmd(${command}),`;
    try {
      // console.log(ftag, 'body=', body);
      return await this.reqCmd('site/cmd', command, body);
    } catch (err) {
      console.log(ftag, 'err=', err);
      throw err;
    }
  }

  async reqBnnCmd(command: string, body: any = {}): Promise<any> {
    const ftag = `reqBnnCmd(${command}),`;
    try {
      // console.log(ftag, 'body=', body);
      return await this.reqCmd('bnn/cmd', command, body);
    } catch (err) {
      console.log(ftag, 'err=', err);
      throw err;
    }
  }

  async reqBannerCmd(command: string, body: any = {}): Promise<any> {
    const ftag = `reqBannerCmd(${command}),`;
    try {
      // console.log(ftag, 'body=', body);
      return await this.reqCmd('banner/cmd', command, body);
    } catch (err) {
      console.log(ftag, 'err=', err);
      throw err;
    }
  }

  async reqAssetCmd(command: string, body: any = {}): Promise<any> {
    const ftag = `reqAssetCmd(${command}),`;
    try {
      // console.log(ftag, 'body=', body);
      return await this.reqCmd('asset/cmd', command, body);
    } catch (err) {
      console.log(ftag, 'err=', err);
      throw err;
    }
  }

  async reqPostCmd(command: string, body: any = {}): Promise<any> {
    const ftag = `reqPostCmd(${command}),`;
    try {
      // console.log(ftag, 'body=', body);
      return await this.reqCmd('post/cmd', command, body);
    } catch (err) {
      console.log(ftag, 'err=', err);
      throw err;
    }
  }

  async reqDepartCmd(command: string, body: any = {}): Promise<any> {
    const ftag = `reqDepartCmd(${command}),`;
    try {
      // console.log(ftag, 'body=', body);
      return await this.reqCmd('depart/cmd', command, body);
    } catch (err) {
      console.log(ftag, 'err=', err);
      throw err;
    }
  }

  async reqNoticeCmd(command: string, body: any = {}): Promise<any> {
    const ftag = `reqNoticeCmd(${command}),`;
    try {
      // console.log(ftag, 'body=', body);
      return await this.reqCmd('notice/cmd', command, body);
    } catch (err) {
      console.log(ftag, 'err=', err);
      throw err;
    }
  }


  async reqCrudCmd(command: string, body: any = {}): Promise<any> {
    const ftag = `reqCrudCmd(${command}),`;
    try {
      // console.log(ftag, 'body=', body);
      return await this.reqCmd('crud/cmd', command, body);
    } catch (err) {
      console.log(ftag, 'err=', err);
      throw err;
    }
  }

  async reqAuthCmd(command: string, body: any = {}): Promise<any> {
    const ftag = `reqAuthCmd(${command}),`;
    try {
      // console.log(ftag, 'body=', body);
      return await this.reqCmd('auth/cmd', command, body);
    } catch (err) {
      console.log(ftag, 'err=', err);
      throw err;
    }
  }

  async reqCategoryCmd(command: string, body: any = {}): Promise<any> {
    const ftag = `reqCategoryCmd(${command}),`;
    try {
      // console.log(ftag, 'body=', body);
      return await this.reqCmd('category/cmd', command, body);
    } catch (err) {
      console.log(ftag, 'err=', err);
      throw err;
    }
  }

  async reqCommentCmd(command: string, body: any = {}): Promise<any> {
    const ftag = `reqCommentCmd(${command}),`;
    try {
      // console.log(ftag, 'body=', body);
      return await this.reqCmd('comment/cmd', command, body);
    } catch (err) {
      console.log(ftag, 'err=', err);
      throw err;
    }
  }

  async reqEvalCmd(command: string, body: any = {}): Promise<any> {
    const ftag = `reqEvalCmd(${command}),`;
    try {
      // console.log(ftag, 'body=', body);
      return await this.reqCmd('eval/cmd', command, body);
    } catch (err) {
      console.log(ftag, 'err=', err);
      throw err;
    }
  }

  async reqReportCmd(command: string, body: any = {}): Promise<any> {
    const ftag = `reqReportCmd(${command}),`;
    try {
      // console.log(ftag, 'body=', body);
      return await this.reqCmd('report/cmd', command, body);
    } catch (err) {
      console.log(ftag, 'err=', err);
      throw err;
    }
  }

  async reqQnaCmd(command: string, body: any = {}): Promise<any> {
    const ftag = `reqQnaCmd(${command}),`;
    try {
      // console.log(ftag, 'body=', body);
      return await this.reqCmd('qna/cmd', command, body);
    } catch (err) {
      console.log(ftag, 'err=', err);
      throw err;
    }
  }

  async reqPwCmd(command: string, body: any = {}): Promise<any> {
    const ftag = `reqPwCmd(${command}),`;
    try {
      // console.log(ftag, 'body=', body);
      return await this.reqCmd('pw/cmd', command, body);
    } catch (err) {
      console.log(ftag, 'err=', err);
      throw err;
    }
  }


  async reqDormantCmd(command: string, body: any = {}): Promise<any> {
    const ftag = `reqDormantCmd(${command}),`;
    try {
      // console.log(ftag, 'body=', body);
      return await this.reqCmd('dormant/cmd', command, body);
    } catch (err) {
      console.log(ftag, 'err=', err);
      throw err;
    }
  }



  navigate(path: string, extras?: NavigationExtras): Promise<boolean> {
    const ftag = `navigate(${path}),`;
    try {
      return this.router.navigate([`${this.siteId}/${path}`], extras);
    } catch (err) {
      console.log(ftag, 'err=', err);
      throw err;
    }
  }

  routeThis(qp: QueryParams) {
    const path = this.config.currentUrl;
    this.config.router.navigate([path], {
      queryParams: qp.getAttrs(),
      replaceUrl: true,
    });
  }

} // end of class

