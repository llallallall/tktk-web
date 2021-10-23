import { BaseModel, Attr } from './../base/base-model';
import { MenuBaseModel } from './menu-base.model';

export class MainMenulModel extends MenuBaseModel {

  static readonly Id = {
    home: 'home',
    admins: 'admins',
    members: 'members',
    communities: 'communities',
    posts: 'posts',
    svc_center: 'svc_center',
    banners: 'banners',
    logout: 'logout',
    ms_new: 'ms_new',

    ms_all: 'ms_all',
    ms_dormant: 'ms_dormant',
    ms_withdrawal: 'ms_withdrawal',
    ms_admin: 'ms_admin',

    cs_category: 'cs_category',
    cs_hashtag: 'cs_hashtag',
    cs_nickname_banned: 'cs_nickname_banned',

    sc_notice: 'sc_notice',
    sc_report: 'sc_report',
    sc_oto: 'sc_oto',
  };

  static readonly Cfg = {
    home: {
      id: MainMenulModel.Id.home,
      title: `홈`,
      path: `/p/h/dashboard`,
      childs: [],
    },
    admins: {
      id: MainMenulModel.Id.admins,
      title: `어드민 관리`, // admin management
      path: `/p/h/admins`,
      childs: [],
    },
    members: {
      id: MainMenulModel.Id.members,
      title: `회원 관리`, // Member Management
      path: `/p/h/members`,
      childs: [
        {
          id: MainMenulModel.Id.ms_new,
          title: `신규회원`, // new member
          path: `/p/h/members/new`,
        },
        {
          id: MainMenulModel.Id.ms_all,
          title: `전체회원`, // All members
          path: `/p/h/members/all`,
        },
        {
          id: MainMenulModel.Id.ms_dormant,
          title: `휴면회원`, // dormant member
          path: `/p/h/members/dormant`,
        },
        {
          id: MainMenulModel.Id.ms_withdrawal,
          title: `탈퇴회원`, // withdrawal member
          path: `/p/h/members/withdrawal`,
        },
        {
          id: MainMenulModel.Id.ms_admin,
          title: `관리자 관리`, // admin management
          path: `/p/h/members/admin`,
        },
      ],
    },
    communities: {
      id: MainMenulModel.Id.communities,
      title: `커뮤니티 관리`, // Community Management
      path: `/p/h/communities`,
      childs: [
        {
          id: MainMenulModel.Id.cs_category,
          title: `카테고리 조회`, // Category lookup
          path: `/p/h/communities/category`,
        },
        {
          id: MainMenulModel.Id.cs_hashtag,
          title: `해시태그`, // hashtag
          path: `/p/h/communities/hashtag`,
        },
        {
          id: MainMenulModel.Id.cs_nickname_banned,
          title: `닉네임 금지어`, // Nickname banned
          path: `/p/h/communities/nb`,
        },
      ],
    },
    posts: {
      id: MainMenulModel.Id.posts,
      title: `게시글 관리`, // Post management
      path: `/p/h/posts`,
      childs: [],
    },
    svc_center: {
      id: MainMenulModel.Id.svc_center,
      title: `고객센터`, // Service center
      path: `/p/h/scenter`,
      childs: [
        {
          id: MainMenulModel.Id.sc_notice,
          title: `공지사항`, // Notice
          path: `/p/h/scenter/notice`,
        },
        {
          id: MainMenulModel.Id.sc_report,
          title: `신고`, // report
          path: `/p/h/scenter/report`,
        },
        {
          id: MainMenulModel.Id.sc_oto,
          title: `1:1문의`, // 1:1 inquiry
          path: `/p/h/scenter/oto`,
        },
      ],
    },
    banners: {
      id: MainMenulModel.Id.banners,
      title: `배너관리`, // banner management
      path: `/p/h/banners`,
      childs: [],
    },
  };



  static readonly defaultMenus: MainMenulModel[] = [
    new MainMenulModel(MainMenulModel.Cfg.home),
    new MainMenulModel(MainMenulModel.Cfg.admins),
    new MainMenulModel(MainMenulModel.Cfg.members),
    new MainMenulModel(MainMenulModel.Cfg.communities),
    new MainMenulModel(MainMenulModel.Cfg.posts),
    new MainMenulModel(MainMenulModel.Cfg.svc_center),
    new MainMenulModel(MainMenulModel.Cfg.banners),
  ];


  childs: MainMenulModel[] = [];
  expanded = false;
  isChild: boolean = false;
  parent: MainMenulModel;

  constructor(public attrs: any = {}) {
    super(attrs || {});
    if (attrs.childs) {
      for (const item of attrs.childs) {
        const m = new MainMenulModel(item);
        m.isChild = true;
        m.parent = this;
        this.childs.push(m);
      }
    }
  }

  findMenu(pathUrl: string): MenuBaseModel {
    const ftag = `findMenu(${pathUrl}, ${this.path}),`;
    if (this.childs.length > 0) {
      for (const item of this.childs) {
        const m = item.findMenu(pathUrl);
        if (m) {
          // console.log(ftag, 'path=', m.path);
          return m;
        }
      }
    }
    // console.log(ftag,);    
    if (pathUrl.startsWith(this.path)) {
      return this;
    }
  }

}