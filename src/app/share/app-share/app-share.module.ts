import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from '../material/material.module';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { HeaderComponent } from './layout/header/header.component';
import { ErrDlgComponent } from './dlg/err-dlg/err-dlg.component';
import { ConfirmDlgComponent } from './dlg/confirm-dlg/confirm-dlg.component';
import { PageTitleComponent } from './layout/page-title/page-title.component';
import { PageContainerComponent } from './layout/page-container/page-container.component';
import { NgxMaskModule } from 'ngx-mask';
import { MyAccountComponent } from './link/my-account/my-account.component';
import { TextInputDlgComponent } from './dlg/text-input-dlg/text-input-dlg.component';
import { PageTitleBackComponent } from './layout/page-title-back/page-title-back.component';
import { CuDatePickerComponent } from './date/cu-date-picker/cu-date-picker.component';
import { CuDateDlgComponent } from './date/cu-date-dlg/cu-date-dlg.component';
import { CuDateBoxComponent } from './date/cu-date-box/cu-date-box.component';
import { MatTypographyComponent } from './style/mat-typography/mat-typography.component';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { PdfViewComponent } from './pdf/pdf-view/pdf-view.component';
import { PdfLinkComponent } from './pdf/pdf-link/pdf-link.component';
import { UiTypePickerComponent } from './ui-design/ui-type-picker/ui-type-picker.component';
import { FooterComponent } from './layout/footer/footer.component';
import { PostListTypePickerComponent } from './communities/post-list-type-picker/post-list-type-picker.component';
import { PostMenuComponent } from './communities/post-menu/post-menu.component';
import { PostToolsComponent } from './communities/post-tools/post-tools.component';
import { CommentAddComponent } from './communities/comment-add/comment-add.component';
import { GridInputBoxComponent } from './form/grid-input-box/grid-input-box.component';
import { HomeToolbarComponent } from './layout/home-toolbar/home-toolbar.component';
import { ItemsLoadGuideComponent } from './list/items-load-guide/items-load-guide.component';
import { CommentItemComponent } from './communities/comment-item/comment-item.component';
import { CommentListComponent } from './communities/comment-list/comment-list.component';
import { PostCommentListComponent } from './communities/post-comment-list/post-comment-list.component';
import { PostCommentItemComponent } from './communities/post-comment-item/post-comment-item.component';
import { CommentAddBsComponent } from './communities/comment-add-bs/comment-add-bs.component';
import { GlobalSearchBoxComponent } from './form/global-search-box/global-search-box.component';
import { ReportDlgComponent } from './cs/report-dlg/report-dlg.component';
import { QnaSearchTypePickerComponent } from './cs/qna-search-type-picker/qna-search-type-picker.component';
import { SearchUserFilterComponent } from './picker/search-user-filter/search-user-filter.component';
import { QnaQclassPickerComponent } from './cs/qna-qclass-picker/qna-qclass-picker.component';
import { CuTuiViewerComponent } from './editor/cu-tui-viewer/cu-tui-viewer.component';
import { CuEditorComponent } from './editor/cu-editor/cu-editor.component';
import { EdMediaInputFormComponent } from './editor/ed-media-input-form/ed-media-input-form.component';
import { EdMediaInputDlgComponent } from './editor/ed-media-input-dlg/ed-media-input-dlg.component';
import { PostEditComponent } from './posts/post-edit/post-edit.component';
import { BannerSliderComponent } from './cs/banner-slider/banner-slider.component';
import { SwiperModule } from 'swiper/angular';
import { EvalToolsComponent } from './communities/eval-tools/eval-tools.component';
import { NoticeEditComponent } from './posts/notice-edit/notice-edit.component';

@NgModule({
  declarations: [
    HeaderComponent,
    ErrDlgComponent,
    ConfirmDlgComponent,
    PageTitleComponent,
    PageContainerComponent,
    MyAccountComponent,
    TextInputDlgComponent,
    PageTitleBackComponent,
    CuDatePickerComponent,
    CuDateDlgComponent,
    CuDateBoxComponent,
    MatTypographyComponent,
    PdfViewComponent,
    PdfLinkComponent,
    UiTypePickerComponent,
    FooterComponent,
    PostListTypePickerComponent,
    PostMenuComponent,
    PostToolsComponent,
    CommentAddComponent,
    GridInputBoxComponent,
    HomeToolbarComponent,
    ItemsLoadGuideComponent,
    CommentItemComponent,
    CommentListComponent,
    PostCommentListComponent,
    PostCommentItemComponent,
    CommentAddBsComponent,
    GlobalSearchBoxComponent,
    ReportDlgComponent,
    QnaSearchTypePickerComponent,
    SearchUserFilterComponent,
    QnaQclassPickerComponent,
    CuTuiViewerComponent,
    CuEditorComponent,
    EdMediaInputFormComponent,
    EdMediaInputDlgComponent,
    PostEditComponent,
    BannerSliderComponent,
    EvalToolsComponent,
    NoticeEditComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule,
    FlexLayoutModule,
    FormsModule,
    DragDropModule,
    ClipboardModule,
    NgxMaskModule.forRoot(),
    PdfViewerModule,
    SwiperModule,
  ],
  exports: [
    RouterModule,
    FlexLayoutModule,
    MaterialModule,
    FormsModule,
    NgxMaskModule,
    PdfViewerModule,
    HeaderComponent,
    ErrDlgComponent,
    ConfirmDlgComponent,
    PageTitleComponent,
    PageContainerComponent,
    PageTitleBackComponent,
    CuDateBoxComponent,
    MatTypographyComponent,
    PdfViewComponent,
    PdfLinkComponent,
    UiTypePickerComponent,
    FooterComponent,
    PostMenuComponent,
    PostToolsComponent,
    CommentAddComponent,
    HomeToolbarComponent,
    GridInputBoxComponent,
    ItemsLoadGuideComponent,
    PostCommentListComponent,
    GlobalSearchBoxComponent,
    SearchUserFilterComponent,
    QnaQclassPickerComponent,
    CuTuiViewerComponent,
    CuEditorComponent,
    PostEditComponent,
    BannerSliderComponent,
    EvalToolsComponent,
    NoticeEditComponent,
  ],
  entryComponents: [
  ],
})
export class AppShareModule { }
