import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatExpansionPanel } from '@angular/material/expansion';
import { MainMenulModel } from 'src/app/models/menus/main-menu.model';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-home-menu-item',
  templateUrl: './home-menu-item.component.html',
  styleUrls: ['./home-menu-item.component.scss',],
})
export class HomeMenuItemComponent implements OnInit {

  @Input() menu: MainMenulModel;
  @ViewChild(MatExpansionPanel) pannel?: MatExpansionPanel;

  constructor(
    private _api: ApiService,
  ) { }

  ngOnInit(): void {
    const ftag = `ngOnInit(),`;
    // console.log(ftag, 'childs=', this.menu.childs);
  }


  get arrowImg(): string {
    // https://trello.com/c/oiN9egOC/1-디자인을-위한-화면설계서-검토
    if (this.menu.childs.length > 0) {
      if (this.menu.expanded) {
        return '/assets/svg/icons/icon-navigation-up.svg';
      } else {
        return '/assets/svg/icons/icon-navigation-down.svg';
      }
    }
    return '/assets/svg/icons/icon-navigation-right.svg';
  }

  on_opened($event) {
    const ftag = `on_opened(),`;
    if (this.menu.childs.length === 0) {
      // console.log(ftag, '$event=', $event);
      // console.log(ftag, 'pannel=', this.pannel);
      this.pannel.close();
      this._api.router.navigate([`${this._api.siteId}/${this.menu.path}`]);
      return;
    }
    this.menu.expanded = true;
  }

  on_closed($event) {
    this.menu.expanded = false;
  }

  get expanded(): boolean {
    return this.menu.expanded;
  }

  onClickChild(item: MainMenulModel) {
    this._api.router.navigate([`${this._api.siteId}/${item.path}`]);
  }


}
