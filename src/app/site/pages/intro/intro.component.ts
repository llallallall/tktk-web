import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { SiteModel } from "src/app/models/site/site.model";
import { ApiService } from "src/app/service/api.service";
import { fadeIn } from "src/app/share/animations/fade-in.animation";

@Component({
  selector: "app-intro",
  templateUrl: "./intro.component.html",
  animations: [fadeIn],
  styleUrls:['./intro.component.scss']
})
export class IntroComponent implements OnInit {
  isLoading = false;

  tags = ['코로나','COVID-19','등교중지','이태원','클럽','집콕','마스크','해시태그명']

  articles = [
    {
      thumbnailUrl: '/assets/images/figma/article-thumb01.png',
      title: `막장으로 치닫는 '저거' 진실게임…이준석-元 정면충돌`,
      boardName: '갤러리 명',
      regDate:'1시간전'
    },
    {
      thumbnailUrl: '/assets/images/figma/article-thumb01.png',
      title: `막장으로 치닫는 '저거' 진실게임…이준석-元 정면충돌`,
      boardName: '갤러리 명',
      regDate:'2시간전'
    },
    {
      thumbnailUrl: '/assets/images/figma/article-thumb01.png',
      title: `막장으로 치닫는 '저거' 진실게임…이준석-元 정면충돌`,
      boardName: '갤러리 명',
      regDate:'3시간전'
    }
  ];  

  recentArticles = ['쓱쓱싹싹놀이터','금융어플리케이션','해외투자뉴스소식','바이오폭락의손의 주식','로스트아크','판타지','일상나누기','코로나 바이러스 갤러리','게임프리크'];

  constructor(private _api: ApiService, private _aRoute: ActivatedRoute) {}

  ngOnInit(): void {
    // this.parseParams();
    // const ftag = `ngOnInit(),`;
    // // const routeParams = this._aRoute.snapshot.paramMap;
    // // const siteId = routeParams.get('siteId');
    // // console.log(ftag, 'siteId=', siteId);
    // const urls = this._api.currentUrl.split('/');
    // console.log(ftag, 'urls=', urls);
    // if (urls.length < 2) {
    //   this._api.config.gotoSiteList();
    //   return;
    // }
    // const siteId = urls[1];
    // this.loadSiteIfNeed(siteId);
    // this.parseParams();
    // if (siteId) {
    //   this.loadSiteIfNeed(siteId);
    // } else {
    //   this._api.config.gotoSiteList();
    // }
  }

  parseParams() {
    const ftag = `parseParams()`;
    this._aRoute.queryParams.subscribe((querys) => {
      const routeParams = this._aRoute.snapshot.paramMap;
      const siteId = routeParams.get("siteId");
      console.log(ftag, "siteId=", siteId);
      // console.log(ftag, 'querys=', querys);
      // const q = _.clone(querys);
      // this.qp = new QueryParams(q);
      // // console.log(ftag, 'pageParams=', this.pageParams.getAttrs());
      // // console.log(ftag, 'searchWord=', this.pageParams.get('searchWord'));
      // this.loadItems();
    });
  }

  get siteModel(): SiteModel {
    return this._api.config.siteModel;
  }

  async loadSiteIfNeed(siteId: string) {
    const ftag = `(loadSiteIfNeed(${siteId})),`;
    try {
      console.log(ftag, "siteModel=", this._api.siteModel);
      if (this._api.siteModel?.siteId === siteId) {
        this._api.navigate(`/p/h`);
        return;
      }
      this._api.config.siteModel = null;
      this.isLoading = true;
      const error = await this._api.reqGetSite(siteId);
      this.isLoading = false;
      // console.log(ftag, 'res=', res);
      if (this._api.siteModel) {
        this._api.navigate(`/p/h`);
        return;
      }
      this._api.config.gotoSiteList();
    } catch (err) {
      this.isLoading = false;
      console.log(ftag, "err=", err);
    }
  }
}
