import { Component, OnInit } from '@angular/core';
import { UserModel } from 'src/app/models/users/user-model';
import { ApiService } from 'src/app/service/api.service';
import { fadeIn } from 'src/app/share/animations/fade-in.animation';

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  animations: [fadeIn,],
})
export class MyAccountComponent implements OnInit {

  hover = false;

  constructor(
    private _api: ApiService,
  ) { }

  ngOnInit(): void {
    const ftag = `ngOnInit(),`;
    console.log(ftag, 'userModel=', this.userModel);    
  }

  get userModel(): UserModel {
    return this._api.me;
  }

  onClickItem() {
    const ftag = `onClickItem(),`;
    console.log(ftag,);
    this._api.router.navigate(['/p/h/me']);
  }

}
