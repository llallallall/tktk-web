import { BaseModel, Attr } from './../base/base-model';


export class QuestionClassModel extends BaseModel {

    static readonly ModelName = 'QuestionClassModel';

    @Attr question?: string;
    @Attr answer?: string;

    //////////////////////////////////////////


    //////////////////////////////////////////

    get validErr(): string {
        if (!this.question) {
            return `질문 유형을 입력하세요`;
        }
        if (!this.answer) {
            return `예상 답변을 입력하세요`;
        }
    }

    //////////////////////////////////////////


    //////////////////////////////////////////

} // end of class
