import { Component, ElementRef, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import Editor from '@toast-ui/editor';
import EditorUtil from 'src/app/utils/editor.util';
import { EdMediaInputDlgComponent } from '../ed-media-input-dlg/ed-media-input-dlg.component';

@Component({
  selector: 'app-cu-editor',
  templateUrl: './cu-editor.component.html',
  styles: [
  ]
})
export class CuEditorComponent implements OnInit {

  @Input() fileClass: string;
  @Input() resourceIdx: string;
  @Output() on_click_cmd = new EventEmitter();
  @Output() on_editor_created = new EventEmitter();

  editor: Editor;

  constructor(
    private _dlg: MatDialog,
  ) { }

  ngOnInit(): void {
    this.setEditor();
  }

  createLastButton(cmd: string) {
    const ftag = `createLastButton(${cmd}),`;

    const button = document.createElement('button');

    let iconId = `add_photo_alternate_black_24dp`;

    button.className = 'toastui-editor-toolbar-icons first';
    button.style.backgroundImage = 'none';
    button.style.margin = '0';
    button.innerHTML = `<img src="/assets/svg/icons/${iconId}.svg">`;
    button.style.width = '32px';
    button.style.height = '32px';
    const self = this;
    button.addEventListener('click', ($event) => {
      // console.log(ftag, 'onClick', $event);
      // editor.exec('bold');
      self.onClickCmd($event, cmd);
    });

    return button;
  }



  onClickCmd($event: any, cmd: string) {
    const ftag = `onClickCmd(),`;
    // console.log(ftag, '$event=', $event);

    const ref = this._dlg.open(EdMediaInputDlgComponent, {
      width: '510px',
      data: {
        trigger: new ElementRef($event.target),
        // model: this.model,
        editor: this.editor,
        fileClass: this.fileClass,
        resourceIdx: this.resourceIdx,
      },
      autoFocus: false,
      panelClass: 'full-mat-dlg-modal',
    });
    ref.afterClosed().subscribe((result) => {
      // console.log(ftag, 'result=', result);
      if (result) {
        // if (result.youtubeId) {
        //   this.onAddYtId(result.youtubeId);
        // }
        // if (result.imageId) {
        //   this.onAddImageId(result.resourceIdx, result.imageId);
        // }
      }
    });

    this.on_click_cmd.emit({
      target: new ElementRef($event.target),
      cmd: cmd,
    })
  }

  setEditor() {
    const ftag = `setEditor(),`;

    this.editor = new Editor({
      el: document.querySelector('#editor'),
      height: '500px',
      initialEditType: 'markdown',
      previewStyle: 'vertical',


      customHTMLSanitizer: EditorUtil.customHTMLSanitizer,
      hideModeSwitch: true,
      toolbarItems: [
        [
          {
            el: this.createLastButton('image_file'),
            name: 'image_file',
            command: '',
            tooltip: 'image file selection'
          },
        ],
        ['heading', 'bold', 'italic', 'strike'],
        ['hr', 'quote'],
        ['ul', 'ol', 'task', 'indent', 'outdent'],
        // ['table', 'image', 'link'],
        ['table', 'link'],
        ['code', 'codeblock'],
        // Using Option: Customize the last button
      ],
    });
    this.on_editor_created.emit(this.editor);
  }

  customHTMLSanitizer($event) {
    const ftag = `customHTMLSanitizer(),`;
    console.log(ftag, '$event=', $event);
    return $event;
  }

}
