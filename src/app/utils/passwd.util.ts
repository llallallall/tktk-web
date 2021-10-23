

export default class PasswdUtil {

    static validateAdm(passwd: string) {
        // if (passwd.length < 2) {
        //     return `비밀번호는 최소 2자 이상이어야 합니다.`;
        // }
        // if (passwd.length > 20) {
        //     return `비밀번호는 최대 20자 이하이어야 합니다.`;
        // }

        if (passwd.length < 2 || passwd.length > 20) {
            return `아이디는 2~20자 이내로 입력해 주세요.`;
          }

        const regType1 = /^[A-Za-z0-9+]*$/;
        if (!regType1.test(passwd)) { 
            return `비밀번호는 영어,숫자만 사용 가능합니다.`;
        }

        // const chk_num = passwd.search(/[0-9]/);
        // const chk_eng = passwd.search(/[a-z]/);
        // const chk_engCap = passwd.search(/[A-Z]/);
        // const strSpecial = passwd.search(/[\~\.\!\@\#\$\%\^\&\*\(\)\_\+\=\{\}\[\|\\\;\:\'\"\/\,\.\?<\>\-\]]/);
        // let valCnt = 0;

        // if (chk_num < 0) {
        //     valCnt++;
        // }
        // if (chk_eng < 0) {
        //     valCnt++;
        // }
        // if (valCnt > 2) {
        //     return '비밀번호는 8자리 이상으로 영문 , 숫자 조합이어야 합니다.';
        // }
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
}

