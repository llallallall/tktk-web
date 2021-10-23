
export default class QueryStringUtil {

    static parse(url: string) {
        const ftag = `parse(${url}),`;
        
        if (typeof url !== 'string') {
            return;
        }
        let params;
        if (url.indexOf('?') === -1) {
            params = url.split('&');
        } else {
            params = url.slice(url.indexOf('?') + 1).split('&');
        }
        // console.log(ftag, 'params=', params);
        if (params.length < 1 || params[0] === '') {
            return;
        }
        var result = {};
        params.forEach(function(pair) {
            pair = pair.split('=');
            result[pair[0]] = decodeURIComponent(pair[1] || '');
        });
    
        return JSON.parse(JSON.stringify(result));
    }


}