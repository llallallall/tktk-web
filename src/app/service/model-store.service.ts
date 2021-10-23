import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { BaseModel } from '../models/base/base-model';
import { UserModel } from '../models/users/user-model';

@Injectable({
  providedIn: 'root'
})
export class ModelStoreService {

  private _storeMap: Map<string, Map<string, BaseModel>> = new Map();

  constructor(
  ) { }

  getStoreMap(modelName: string): Map<string, BaseModel> {
    let map = this._storeMap.get(modelName);
    if (!map) {
      map = new Map();
      this._storeMap.set(modelName, map);
    }
    return map;
  }

  getModel(modelName: string, modelId: any): BaseModel {
    const ftag = `getModel(${modelId})`;
    const map = this.getStoreMap(modelName);
    // console.log(ftag, `map=`, map);
    return map.get(modelId);
  }

  setModel(modelName: string, model: BaseModel) {
    const ftag = `setModel(${modelName})`;
    const map = this.getStoreMap(modelName);
    // console.log(ftag, `map=`, map);
    map.set(model.objectId, model);
  }


  removeModel(modelName: string, modelId: any) {
    const ftag = `removeModel(${modelId})`;
    const map = this.getStoreMap(modelName);
    map.delete(modelId);
    // console.log(ftag, `map=`, map);
  }

  getUserModel(modelId: any): UserModel {
    const ftag = `getUserModel(${modelId})`;
    // console.log(ftag, `map=`, map);
    const ret = this.getModel(UserModel.ModelName, modelId);
    if (ret) {
      return <UserModel>ret;
    }
  }

  setUserModel(model: UserModel) {
    const ftag = `setDeviceModel(${model.objectId})`;
    this.setModel(UserModel.ModelName, model);
    // console.log(ftag, `map=`, map);
  }


}
