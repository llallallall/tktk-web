import { Attr, BaseModel } from './base-model';
import { environment } from 'src/environments/environment';

export class FileResource extends BaseModel {


    static readonly Cmd = {
        delete_image: 'delete_image',
        add_image: 'add_image',
    };
    
    @Attr resourceIdx: string;
    @Attr fileClass: string;
    @Attr fileId: string;
    @Attr index: number;

    fileLocal: File;
    fileLocalSrc: any;

    addMode = false
    isHover = false;

    setResource(siteIdx: string, fileClass: string, resourceIdx: string, fileId: string,) {
        this.siteIdx = siteIdx;
        this.fileClass = fileClass;
        this.resourceIdx = resourceIdx;
        this.fileId = fileId;
    }

    get hasImage(): boolean {
        if (this.siteIdx && this.resourceIdx && this.fileId && this.fileClass) {
            return true;
        }
        if (this.fileLocalSrc) {
            return true;
        }
    }

    get src(): any {
        if (this.fileLocalSrc) {
            return this.fileLocalSrc;
        }
        return this.imgPath;
    }

    get imgPath(): string {
        if (this.fileId) {
            return `${environment.apiServerUrl}/media/file?siteIdx=${this.siteIdx}&fileClass=${this.fileClass}&resourceIdx=${this.resourceIdx}&fileId=${this.fileId}`;
        }
    }

}
