import { ThisReceiver } from '@angular/compiler';
import { FileResource } from '../base/file-resource';
import { Cd } from '../codes/cd';
import { UserModel } from '../users/user-model';
import { BaseModel, Attr } from './../base/base-model';
import { QuestionClassModel } from './question-class.model';


export class OtoqModel extends BaseModel {

    static readonly ModelName = 'OtoqModel';

    @Attr title: string;
    @Attr question: string;
    @Attr joinType?: string;
    @Attr deletedFlag: string;

    @Attr questionClassIdx: string;
    @Attr questionClass: string;
    @Attr answer: string;
    @Attr answerTs: number;
    @Attr answerUpdatedTs: number;
    @Attr answerDoneFlag: string;
    @Attr answerUserIdx: string;
    @Attr passwd: string;
    @Attr fileId: string;


    //////////////////////////////////////////

    localResource: FileResource;
    userCreator: UserModel;
    userAnswer: UserModel;
    questionClassModel: QuestionClassModel;


    //////////////////////////////////////////

    constructor(
        public attrs: any = {}
    ) {
        super(attrs);
        if (attrs.qclass) {
            this.questionClassModel = new QuestionClassModel(attrs.qclass);
        }
    }

    //////////////////////////////////////////

    get validErr(): string {
        if (!this.title) {
            return `제목을 입력해 주세요.`;
        }
        if (this.title.length < 2) {
            return `제목은 2~40자 이내로 작성해 주세요.`;
        }
        if (this.title.length > 40) {
            return `제목은 2~40자 이내로 작성해 주세요.`;
        }
        if (!this.questionClassIdx) {
            return `질문유형을 선택해 주세요.`;
        }
        if (!this.question) {
            return `내용을 입력해 주세요.`;
        }
        if (!this.passwd) {
            return `비밀번호를 입력해 주세요.`;
        }
        if (this.passwd.length < 4) {
            return `비밀번호 4자리를 입력해 주세요.`;
        }
    }

    get doneFlag(): string {
        return this.answerDoneFlag === Cd.YN.Y ? '완료' : '미완료';
    }

    get answeredAt(): Date {
        if (this.answerTs) {
            return new Date(this.answerTs);
        }
    }

    get answerUpdatedAt(): Date {
        if (this.answerUpdatedTs) {
            return new Date(this.answerUpdatedTs);
        }
    }

    get isDeleted(): boolean {
        return this.deletedFlag === Cd.YN.Y ? true : false;
    }
    //////////////////////////////////////////

} // end of class
