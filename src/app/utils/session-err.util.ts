import { Router } from "@angular/router";

export default class SessionErrUtil {

    static readonly type = {
        no_me: 'no_me',
        invalid_token: 'invalid_token',
        no_params_intro: 'no_params_intro',
    };

    static gotoErr(router: Router, type: string) {
        router.navigate(['/p/a/session-err'], {
            queryParams: {
                type: type,
            },
            replaceUrl: true,
        });
    }
}
