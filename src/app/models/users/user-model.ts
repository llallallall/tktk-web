import DateUtil from 'src/app/utils/date-util';
import { Cd } from '../codes/cd';
import { GalleryModel } from '../communities/gallery.model';
import { BaseModel, Attr } from './../base/base-model';
import { DepartModel } from './depart.model';

export class UserModel extends BaseModel {

  static readonly ModelName = 'UserModel';

  static readonly ErrCd_DORMANT_USER = 144;

  // https://trello.com/c/VuSKp6EK/6-사용자-분류-및-정의
  static readonly UserClass = {
    client: 'client', // 일반회원
    admin: 'admin', // 어드민 - 파트너
    // manager: 'manager', // 관리자 - 갤러리운영자
    system: 'system',
  };

  static readonly UserLevel = {
    super: 'super', // 최고관리자 - 더이앤엠
    adm_super: 'adm_super', // 어드민 (super) - 파트너
    adm_normal: 'adm_normal', // 어드민 (normal) - 파트너
    manager: 'manager', // 관리자 (매니저) - 갤러리운영자
    manager_sub: 'manager_sub', // 관리자 (부매니저) - 갤러리운영자
    none: 'none',
  };

  static readonly UserLevelName = {
    super: '최고관리자', // 최고관리자 - 더이앤엠
    adm_super: '조직관리자', // 어드민 (super) - 파트너
    adm_normal: '컨텐츠관리자', // 어드민 (normal) - 파트너
    manager: '매니저', // 관리자 (매니저) - 갤러리운영자
    manager_sub: '부매니저', // 관리자 (부매니저) - 갤러리운영자
    none: '일반',
  };

  static readonly ClientType = {
    super: 'super', // tktk-super
    web: 'web', // tktk-web
    admin: 'admin', // tktk-admin
  };

  // static readonly FileClass = {
  //   user_photo: 'user_photo',
  // };

  static readonly Auth = {
    iamp: 'iamp',
    snum: 'snum',
    id: 'id',
    email: 'email',
    phone: 'phone',
    kakao: 'kakao',
    naver: 'naver',
    apple: 'apple',
    facebook: 'facebook',
    google: 'google',
  };

  static readonly JoinType = {
    general: 'general',
    sns: 'sns',
  };

  static readonly JoinTypeName = {
    general: '일반',
    sns: 'SNS',
  };


  static readonly State = {
    active: 'active',
    dormant: 'dormant',
    withdrawn: 'withdrawn',
  };

  static readonly StateName = {
    active: '정상',
    dormant: '휴면',
    withdrawn: '탈퇴',
  };

  passwdConfirm: string;

  /////////////////////////////////////////////

  @Attr userId: string;
  @Attr passwd: string;
  @Attr userClass: string;
  @Attr userLevel: string;
  @Attr departIdx: string;

  @Attr lastLoginTs: number;
  @Attr passwdChangedTs: number;
  @Attr name: string;
  @Attr nickname: string;
  @Attr email: string;
  @Attr authType: string;
  @Attr authId: string;
  @Attr joinType: string;

  @Attr state: string;
  @Attr sanctionTs: number;
  @Attr sanctioned: string;
  @Attr identityVerified: string;
  // @Attr adultVerified: string;

  @Attr birthDate: string;
  @Attr gender: string;
  @Attr galleryIdx: string; // 소속갤러리

  @Attr phoneNumber: string;
  @Attr receiveInfos: string;
  @Attr installIdx: string;

  checked = false;
  departModel: DepartModel;
  galleryModel: GalleryModel;
  decrypted: any = {};

  constructor(public attrs: any = null) {
    super(attrs);
    if (attrs?.departModel) {
      this.departModel = new DepartModel(attrs.departModel);
      // console.log(UserModel.ModelName, 'departModel=', this.departModel);
    }
  }

  public getLabelName(key) {
    switch (key) {
      case 'email': return 'Email';
      case 'authId': return 'Email';
      case 'passwd': return 'Password';
      case 'name': return 'Name';
      case 'phoneNumber': return 'Phone Number';
      case 'passwdConfirm': return 'Password Confirm';
    }
    return 'unknown key';
  }

  public getMaxLen(key) {
    switch (key) {
      case 'email': return 128;
      case 'authId': return 128;
      case 'passwd': return 30;
      case 'name': return 30;
      case 'phoneNumber': return 16;
      case 'passwdConfirm': return 30;
    }
    return 0;
  }

  public get lastLoginAtDate(): Date {
    if (this.lastLoginTs) {
      return new Date(this.lastLoginTs);
    }
  }

  public get passwdChangedAtDate(): Date {
    if (this.passwdChangedTs) {
      return new Date(this.passwdChangedTs);
    }
  }

  get isSys(): boolean {
    // return this.get('isSystem');
    return false;
  }


  get authTypeName2(): string {
    switch (this.authType) {
      case UserModel.Auth.snum: return '주민등록번호';
      case UserModel.Auth.iamp: return '다날';
      case UserModel.Auth.email: return '이메일';
      case UserModel.Auth.phone: return '일반휴대폰';
      case UserModel.Auth.kakao: return '카카오';
      case UserModel.Auth.naver: return '네이버';
      case UserModel.Auth.apple: return '애플';
    }
  }

  // get doctorName(): string {
  //   if (this.get('doctorName')) {
  //     return 
  //   }
  //   if (this.staffProfileModel) {
  //     return this.staffProfileModel.staffName;
  //   }
  // }

  validatePasswd() {
    const chk_num = this.passwd.search(/[0-9]/);
    const chk_eng = this.passwd.search(/[a-z]/);
    const chk_engCap = this.passwd.search(/[A-Z]/);
    const strSpecial = this.passwd.search(/[\~\.\!\@\#\$\%\^\&\*\(\)\_\+\=\{\}\[\|\\\;\:\'\"\/\,\.\?<\>\-\]]/);
    let valCnt = 0;

    if (chk_num < 0) {
      valCnt++;
    }
    if (chk_eng < 0) {
      valCnt++;
    }
    if (valCnt > 2) {
      return '비밀번호는 8자리 이상으로 영문 , 숫자 조합이어야 합니다.';
    }
    // if (chk_engCap < 0) {
    //   valCnt++;
    // }
    // if (strSpecial < 0) {
    //   valCnt++;
    // }
    // if (valCnt > 2) {
    //   return '비밀번호는 8자리 이상으로 영문 대문자, 영문 소문자, 숫자, 특수문자 중 최소 2가지를 포함하여야 합니다.';
    // }
    // return null;
  }

  //////////////////////////////////////////////////////////////////////



  get departName(): string {
    const ret = this.departModel?.name || this.departIdx;
    return ret;
  }

  // get userLevelName(): string {
  //   switch (this.userLevel) {
  //     case UserModel.UserLevel.adm_super: return `super`;
  //     case UserModel.UserLevel.adm_normal: return `normal`;
  //   }
  // }

  get stateName(): string {
    return UserModel.StateName[this.state];
  }

  get validateAdm(): string {
    if (!this.userId) {
      return `아이디를 입력해 주세요.`;
    }
    if (this.userId.length < 2 || this.userId.length > 10) {
      return `아이디는 2~10자 이내로 입력해 주세요.`;
    }
    const reg_userId = /^[A-Za-z0-9+]*$/;
    if (!reg_userId.test(this.userId)) {
      return `아이디는 영어,숫자만 사용 가능합니다.`;
    }
    if (!this.userLevel) {
      return `어드민 등급을 입력해 주세요.`;
    }
    if (!this.name) {
      return `이름을 입력해 주세요.`;
    }
    if (this.name.length < 2) {
      return `이름은 2글자 이상 입력해 주세요.`;
    }
    if (!this.departIdx) {
      return `소속을 입력해 주세요.`;
    }
  }

  //////////////////////////////////////////////////////////////////////

  get authTypeName(): string {
    switch (this.authType) {
      case UserModel.Auth.id:
      case UserModel.Auth.email: {
        return `일반 회원`;
      }
    }
    return `SNS 회원`;
  }

  get userLevelName(): string {
    return UserModel.UserLevelName[this.userLevel];
  }

  get joinTypeName(): string {
    return UserModel.JoinTypeName[this.joinType];
  }

  // https://trello.com/c/MCYk3Da8/72-게시글-목록-닉네임-처리-문의
  get displayName(): string {
    if (this.userClass === UserModel.UserClass.admin) {
      return '관리자';
    }
    return this.nickname;
  }

  get memberState(): string {
    switch (this.state) {
      case UserModel.State.active: return '회원';
      case UserModel.State.dormant: return '휴먼 회원';
      case UserModel.State.withdrawn: return '탈퇴 회원';
    }
    return `unknown (${this.state})`;
  }
  // get displayName(): string {
  //   return this.name || this.nickname || this.userId || this.objectId;
  // }

  get isManagerClass(): boolean {
    switch (this.userLevel) {
      case UserModel.UserLevel.manager:
      case UserModel.UserLevel.manager_sub: {
        return true;
      }
    }
  }

  //////////////////////////////////////////////////////

  get age(): number {
    return DateUtil.getAge(this.birthDate);
  }

  // https://crazyup.monday.com/boards/1691140764/views/35157687/pulses/1738202517
  get isAdult(): boolean {
    if (this.age === 0) {
      return true;
    }
    if (this.age >= 19) {
      return true;
    }
  }

  get adultVerified(): boolean {
    if (this.identityVerified === Cd.YN.Y && this.isAdult) {
      return true;
    }
  }

  get adultVerifiedText(): string {
    if (this.isAdult) {
      if (Cd.isYes(this.identityVerified)) {
        return `성인`;
      }
      return `미 인증`;
    }
    return `비 성인`;
  }

  //////////////////////////////////////////////////////
}  // end of class
