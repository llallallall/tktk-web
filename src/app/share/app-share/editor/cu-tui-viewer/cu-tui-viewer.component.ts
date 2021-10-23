import { Component, Input, OnInit } from '@angular/core';
import Editor from '@toast-ui/editor';
import ToastuiEditorViewer from '@toast-ui/editor/dist/toastui-editor-viewer';

@Component({
  selector: 'app-cu-tui-viewer',
  templateUrl: './cu-tui-viewer.component.html',
  styles: [
  ]
})
export class CuTuiViewerComponent implements OnInit {

  @Input() markdown: string;
  editor: Editor;


  constructor() { }

  ngOnInit(): void {
    this.setEditor();
    this.editor.setMarkdown(this.markdown);
  }

  setEditor() {
    const ftag = `setEditor(),`;

    this.editor = new ToastuiEditorViewer({
      el: document.querySelector('#editor'),
      height: '100%',
      content: '#hello',
      customHTMLSanitizer: this.customHTMLSanitizer.bind(this),
    });
    // console.log(ftag, 'editor=', this.editor);
  }

  customHTMLSanitizer($event) {
    const ftag = `customHTMLSanitizer(),`;
    // console.log(ftag, '$event=', $event);
    return $event;
  }

}
