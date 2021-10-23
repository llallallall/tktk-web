import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { CategoryModel } from 'src/app/models/communities/category.model';
import { GalleryModel } from 'src/app/models/communities/gallery.model';
import { ApiService } from 'src/app/service/api.service';
import { CategoryService } from 'src/app/service/category.service';
import { fadeIn } from 'src/app/share/animations/fade-in.animation';

// https://www.figma.com/file/5McWa4BMFFXRDM4qfsklr4/tikitaka-user?node-id=0%3A299

@Component({
  selector: 'app-gallery-home',
  templateUrl: './gallery-home.component.html',
  animations: [fadeIn,],
})
export class GalleryHomeComponent implements OnInit {

  galleryModel: GalleryModel;
  isLoading = false;

  navLinks = [
    {
      label: '전체글',
      link: '/p/h/gallery/gh/all',
      index: 0,
    },
    {
      label: 'HOT',
      link: '/p/h/gallery/gh/hot',
      index: 1,
    },
    {
      label: '공지',
      link: '/p/h/gallery/gh/notice',
      index: 2,
    },
  ];


  constructor(
    private _category: CategoryService,
    private _api: ApiService,
    private _aRoute: ActivatedRoute,
    private _dlg: MatDialog,
    private _sb: MatSnackBar,
  ) { 
    for(const item of this.navLinks) {
      item.link = '/' + _api.siteId + item.link;
    }
  }


  ngOnInit(): void {

    this.parseParams();
  }

  parseParams() {
    const ftag = `parseParams()`;
    this._aRoute.queryParams.subscribe((querys) => {
      console.log(ftag, 'querys=', querys);
      if (querys.galleryIdx) {
        this.loadModel(querys.galleryIdx);
      }
    });
  }

  async loadModel(galleryIdx: string) {
    const ftag = `loadModel(),`;
    try {
      this.isLoading = true;
      this.galleryModel = await this._category.loadGalleryIfNeed(galleryIdx);
      this.isLoading = false;
      console.log(ftag, 'galleryModel=', this.galleryModel);
    } catch (err) {
      this.isLoading = false;
      console.log(ftag, 'err=', err);
    }
  }

}
