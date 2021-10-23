import * as _ from 'lodash';
import * as moment from 'moment';

export class BaseModel {

  public uiVariable: any = {};

  private _attributes: any = {};
  private _changed: any = {};
  private _origin: any = {};

  public debug = false;

  constructor(attrs: any = null) {
    this.setAttrs(attrs);
  }

  public setAttrs(attrs: any, withOrigin = true, withRevert = true) {
    this._attributes = attrs || {};
    if (withOrigin) {
      this._origin = _.clone(this._attributes);
    }
    if (withRevert) {
      this._changed = {};
    }
  }

  public setOrgAttr(key: string, value: any) {
    this._origin[key] = value;
    this.set(key, value, false);
    delete this._changed[key];
  }

  public get(attr: string): any {
    return this._attributes[attr];
  }

  public setData(data: any, withChanged = true) {
    this.set(data.itemId, data.value, withChanged);
  }

  public set(key: string, value: any, withChanged = true) {
    // console.log('setChange(), key=', key, value);
    this._attributes[key] = value;
    if (withChanged) {
      this.setChange(key, value);
    }
  }

  public unset(key: string, withChanged = true) {
    delete this._attributes[key];
    if (withChanged) {
      delete this._changed[key];
    }
  }


  public setChange(key: string, value: any) {
    // console.log('setChange(), key=', key, value);
    if (this.isEqual(key)) {
      delete this._changed[key];
    } else {
      this.addChange(key, value);
    }
  }

  public addChange(key: string, value: any) {
    this._changed[key] = value;
  }

  public isEqual(key: string): boolean {
    const cur = this._attributes[key];
    const org = this._origin[key];

    if (_.isEqual(cur, org)) {
      // console.log('isEqual(), key=', key, cur, org);
      return true;
    }
    // console.log('isEqual(), key=', key, cur, org);
    if (_.isNil(org)) {
      if (_.isString(cur) && cur.length === 0) {
        // console.log('isEqual(), cur.length=', cur.length);
        return true;
      }
      // console.log('isEqual(), typeof cur=', typeof cur);
      // console.log('isEqual(), typeof org=', typeof org);
    }
    return false;
  }

  public get isChanged(): boolean {
    return this.hasChanged();
  }

  get applicable(): boolean {
    return this.isChanged;
  }

  hasChanged(key = null): boolean {
    if (key) {
      if (this._changed[key]) {
        return true;
      }
      return false;
    }
    // console.log('hasChanged(), this._changed=', this._changed);
    if (_.keys(this._changed).length > 0) {
      return true;
    }
    return false;
  }

  getChanged(): any {
    return this._changed;
  }

  getAttrs(): any {
    return this._attributes;
  }

  revert() {
    this._changed = {};
    this._attributes = _.clone(this._origin);
  }

  get objectId(): string {
    return this.get('objectId');
  }

  set objectId(value: string) {
    this.set('objectId', value);
  }

  get siteIdx(): string {
    return this.get('siteIdx');
  }

  set siteIdx(value: string) {
    this.set('siteIdx', value);
  }
  
  get creatorIdx(): string {
    return this.get('creatorIdx');
  }

  set creatorIdx(value: string) {
    this.set('creatorIdx', value);
  }

  public get createdAt(): string {
    return this.get('createdAt');
  }

  public get createdAtDate(): Date {
    if (this.createdTs) {
      return new Date(this.createdTs);      
    }
  }

  public get createdTs(): number {
    return this.get('createdTs');
  }

  public get updatedAtDate(): Date {
    if (this.updatedTs) {
      return new Date(this.updatedTs);      
    }
  }

  public get updatedTs(): number {
    return this.get('updatedTs');
  }

  public get apiErrMag(): string {
    return this.get('apiErrMag');
  }

  public set apiErrMag(value: string) {
    this.set('apiErrMag', value);
  }

} // end of class

export function Attr(target: Object, name: string) {
  // const ftag = `Attr(${name})(),`;
  
  // console.log('======================');
  // console.log(ftag, 'target=', target);
  Object.defineProperty(target, name, {
      get: function () { return this.get(name); },
      set: function (value) { this.set(name, value); },
      enumerable: true,
      configurable: true
  });
}
