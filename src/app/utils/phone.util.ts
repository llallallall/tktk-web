

export default class PhoneUtil {

    static format(num: string) {
        if (!num) {
            return;
        }
        if (num.length == 11) {
            return num.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3');
        } else if (num.length == 8) {
            return num.replace(/(\d{4})(\d{4})/, '$1-$2');
        } else {
            if (num.indexOf('02') == 0) {
                return num.replace(/(\d{2})(\d{4})(\d{4})/, '$1-$2-$3');
            } else {
                return num.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3');
            }
        }
    }
}

