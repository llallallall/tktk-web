

export default class EmailUtil {

    public static readonly domains = [
        'hotmail.com', 'hanmail.net', 'daum.net', 'naver.com', 'gmail.com',
    ];

    public static unpack(data: string, items: Array<string>) {
        if (!data) {
            return;
        }
        const ds = data.split('@');
        for (let ix = 0; ix < ds.length; ix++) {
            items[ix] = ds[ix];
        }
    }

    public static pack(items: Array<string>): string {
        let ret;
        for (const item of items) {
            if (!ret) {
                ret = item;
            } else {
                ret += '@' + item;
            }
        }
        return ret;
    }

    public static hasItemsAll(items: Array<string>): boolean {
        for (const item of items) {
            if (!item) {
                return false;
            }
        }
        return true;
    }


    public static hasItem(items: Array<string>): boolean {
        for (const item of items) {
            if (item) {
                return null;
            }
        }
        return false;
    }

    public static validate(email: string): boolean {
        const regexp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
        return regexp.test(email);
    }

} // end of class