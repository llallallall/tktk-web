import { ErrorCode } from './../models/error-code.enum';
import { ConfigService } from './config.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { UserModel } from '../models/users/user-model';
import ProjectConfig from './project.config';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  verifyCode: string;

  constructor(
    public http: HttpClient,
    public config: ConfigService,
  ) { }

  public isLoggedIn(): boolean {
    const ftag = `isLoggedIn(),`;
    // console.log(ftag, 'tokenInfo=', this.config.tokenInfo);
    if (this.config.tokenInfo) {
      return true;
    }
    return false;
  }

  // get userModel(): UserModel {
  //   return this.config.userModel;
  // }

  public gotoLogin() {
    this.config.gotoLogin();
  }

  private reqHandle0(method: string, httpOptions: any, path: string, body: any = null) {
    const url = this.config.serverUrl + '/' + path;
    // console.log('reqHandle0(), url=', url);
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
    const tokenInfo = this.config.tokenInfo;
    // console.log('reqHandle(), tokenInfo=', tokenInfo);
    const access_token = tokenInfo ? tokenInfo.access_token : null;
    const headers = {
      'Content-Type': 'application/json',
      'X-Crazy-Master-Key': ProjectConfig.server_config.masterKey,
      'X-Crazy-Client-Key': ProjectConfig.server_config.clientKey,
      'X-Crazy-REST-API-Key': ProjectConfig.server_config.apiKey,
    }
    if (access_token) {
      headers['Authorization'] = `Bearer ${access_token}`;
    }

    const httpOptions = {
      headers: new HttpHeaders(headers),
    };
    // console.log('reqHandle(), headers=', httpOptions.headers);
    return this.reqHandle0(method, httpOptions, path, body);
  }

  public reqHttp(method: string, path: string, body: any = null) {
    return new Promise((resolve, reject) => {
      return Promise.resolve()
        .then(() => {
          return this.reqHandle(method, path, body);
        })
        .then((obs: any) => {
          // console.log('reqHttp(), obs=', obs);
          obs.subscribe((res) => {
            // console.log('reqHttp(), res=', res);
            resolve(res);
          }, (err) => {
            console.log('reqHttp(), err=', err);
            reject(err);
          });
        })
        .catch((err) => {
          console.log('reqHttp(), err=', err);
        });
    });
  }

  async reqLogin(userModel: UserModel): Promise<any> {
    const ftag = `reqLogin(${userModel.userId})`;
    try {
      userModel.userClass = UserModel.UserClass.client;
      const res: any = await this.reqAuthCmd('sign_in', userModel.getAttrs());
      // console.log(ftag, 'res=', res);
      if (res.error) {
        // const errorModel = new ErrorModel(res.error);
        return res;
      }
      this.config.tokenInfo = res.result;
      // console.log(ftag, 'tokenInfo=', this.config.tokenInfo);
      this.config.userClass = res.userClass || UserModel.UserClass.client;
      if (this.config.rememberMe) {
        this.config.rememberAuthId = userModel.userId;
      } else {
        this.config.removeItem('rememberEmail');
      }
      return res;
    } catch (err) {
      console.log(ftag, 'err=', err);
      throw err;
    }
  }

  logout() {
    this.config.tokenInfo = null;
    // this.config.userModel = null;
    this.gotoLogin();
  }

  async reqAuthCmd(command: string, body: any = {}): Promise<any> {
    const ftag = `reqCmd(${command}),`;
    try {
      body.command = command;
      // console.log(ftag, 'body=', body);
      return await this.reqHttp('POST', `auth/cmd`, body);
    } catch (err) {
      console.log(ftag, 'err=', err);
      if (err.error) {
        return err;
      }
      if (err.message) {
        return {
          error: err,
        };
      }
      throw err;
    }
  }

}
