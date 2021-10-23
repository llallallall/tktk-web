import { BaseModel, Attr } from '../base/base-model';
import { UserModel } from '../users/user-model';

export class WsModel extends BaseModel {

    static readonly Cmd = {
        ws_started: 'ws_started',
        access_token: 'access_token',
        ws_ready: 'ws_ready',
        subscribe_model: 'subscribe_model',
        notify_model: 'notify_model',
        enter_chat_room: 'enter_chat_room',
        chat_message: 'chat_message',
        check_alive: 'check_alive',
    };


    @Attr command: string;
    @Attr body: any;

    constructor(public attrs: any = {}) {
        super(attrs);
    }

    stringify(): string {
        const data = {
            command: this.command,
            body: this.body || {},
        };
        return JSON.stringify(data);
    }

    static fromString(data: string) {
        const ftag = `fromString(${data}),`;
        try {
            const attr = JSON.parse(data);
            return new WsModel(attr);
        } catch (err) {
            console.log(ftag, 'err=', err);
        }
    }    
} // end of class
