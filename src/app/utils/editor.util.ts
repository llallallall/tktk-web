import { ElementRef } from "@angular/core";
import Editor from "@toast-ui/editor";


export default class EditorUtil {


  static onAddYtId(editor: Editor, youtubeId: string) {
    const ftag = `onAddYtId(${youtubeId}),`;
    let md = editor.getMarkdown();
    let text = `<iframe width="300" height="170" src="https://www.youtube.com/embed/${youtubeId}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media;" allowfullscreen></iframe>`;
    text = `\n ${text} \n`;
    // https://trello.com/c/3B6xOxLl/99-게시글-작성시-로컬-이미지-첨부기능을-dragdrop으로도-제공-요청
    editor.insertText(text);
    // md += `\n ${text} \n`;    
    // editor.setMarkdown(md);
  }

  static onAddImageId(editor: Editor, imgUrl: string) {
    const ftag = `onAddYtId(${imgUrl}),`;
    let md = editor.getMarkdown();
    // const imgUrl = this.model.getImagePath(imageId);
    const text = `\n![](${imgUrl})`;
    // md += `\n![](${imgUrl})`;
    // https://trello.com/c/3B6xOxLl/99-게시글-작성시-로컬-이미지-첨부기능을-dragdrop으로도-제공-요청
    editor.insertText(text);
    // editor.setMarkdown(md);
  }

  static customHTMLSanitizer($event) {
    const ftag = `customHTMLSanitizer(),`;
    // console.log(ftag, '$event=', $event);
    return $event;
  }

}
