import { Component, OnInit, ViewEncapsulation } from '@angular/core';
//import { BannerModel } from 'src/app/models/banner/banner.model';
//import { BannerParam } from 'src/app/models/banner/banner.param';
import { FileResource } from 'src/app/models/base/file-resource';
import { Cd } from 'src/app/models/codes/cd';
import { ApiService } from 'src/app/service/api.service';
import { fadeIn } from 'src/app/share/animations/fade-in.animation';
// import SwiperCore, { SwiperOptions } from 'swiper';
import SwiperCore, { Autoplay, Pagination, Navigation, EffectFade } from "swiper";

// install Swiper modules
// SwiperCore.use([Autoplay, Pagination, Navigation, EffectFade]);
SwiperCore.use([Autoplay,]);

@Component({
  selector: 'app-banner-slider',
  templateUrl: './banner-slider.component.html',
  styleUrls: ['./banner-slider.component.scss',],
  animations: [fadeIn],
  encapsulation: ViewEncapsulation.None,
})
export class BannerSliderComponent implements OnInit {

  isLoading = false;
  //models: BannerModel[];
  items: FileResource[] = [];
  destroyed = false;

  constructor(
    private _api: ApiService,
  ) {
  }

  ngOnInit(): void {
   // this.loadItems();
  }

  ngOnDestroy(): void {
    this.destroyed = true;
  }

  ngAfterViewInit() {
    const ftag = `ngAfterViewInit(),`;
    // console.log(ftag, 'swipers=', this.swiperEl.swiperSlides);
    // setTimeout(() => {
    //   this.initSwiper();
    // }, 500);
  }

  // async loadItems() {
  //   const ftag = `loadItems(),`;
  //   try {
  //     const qp = new BannerParam();
  //     qp.display = Cd.YN.Y;
  //     this.isLoading = true;
  //     const res = await this._api.reqBannerCmd('banner_list', qp.qpBody);
  //     this.isLoading = false;
  //     console.log(ftag, 'res=', res);
  //     if (res.result) {
  //       this.items = [];
  //       this.models = [];
  //       for (const item of res.result) {
  //         const m = new BannerModel(item);
  //         this.models.push(m);
  //         if (window.innerWidth < 500) {
  //           this.items.push(m.imageMobile);
  //         } else {
  //           this.items.push(m.imagePc);
  //         }
          
  //       }
  //       console.log(ftag, 'items=', this.items);
  //     }
  //     console.log(ftag, 'innerWidth=', window.innerWidth);
  //   } catch (err) {
  //     this.isLoading = false;
  //     console.log(ftag, 'err=', err);
  //   }
  // }

  // onClickItem(ix: number, item) {
  //   const ftag = `onClickItem(${ix}),`;
  //   const url = this.models[ix].url;
  //   console.log(ftag, 'url=', url);
  //   window.open(url, "_blank");
  // }


}
