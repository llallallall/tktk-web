import { MatIconModule } from '@angular/material/icon';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule, MatFormFieldControl } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatExpansionModule } from '@angular/material/expansion';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE, NativeDateAdapter, MatPseudoCheckboxModule, MatNativeDateModule } from '@angular/material/core';
import { Moment } from 'moment';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatSliderModule } from '@angular/material/slider';
import { MatMenuModule } from '@angular/material/menu';
import { MatRadioModule } from '@angular/material/radio';
import { MatChipsModule } from '@angular/material/chips';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTableModule } from '@angular/material/table';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatDividerModule } from '@angular/material/divider';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatBadgeModule } from '@angular/material/badge';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatStepperModule } from '@angular/material/stepper';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatTabsModule } from '@angular/material/tabs';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTreeModule } from '@angular/material/tree';
import {MatRippleModule} from '@angular/material/core';
import {OverlayModule} from '@angular/cdk/overlay';
import { MatButtonToggleModule } from '@angular/material/button-toggle';

@NgModule({
    imports: [
        CommonModule,
        MatButtonModule,
        MatCheckboxModule,
        MatPseudoCheckboxModule,
        MatSlideToggleModule,
        MatDatepickerModule,
        MatFormFieldModule,
        MatInputModule,
        MatTabsModule,
        MatDialogModule,
        MatGridListModule,
        MatProgressSpinnerModule,
        MatDialogModule,
        MatToolbarModule,
        MatIconModule,
        MatGridListModule,
        MatListModule,
        MatCardModule,
        MatSliderModule,
        MatMenuModule,
        MatRadioModule,
        MatExpansionModule,
        MatChipsModule,
        MatSnackBarModule,
        MatProgressBarModule,
        MatSelectModule,
        MatTableModule,
        MatAutocompleteModule,
        MatDividerModule,
        MatPaginatorModule,
        MatBadgeModule,
        MatTooltipModule,
        MatSidenavModule,
        MatBottomSheetModule,
        MatStepperModule,
        MatTreeModule,
        MatNativeDateModule,
        MatRippleModule,
        OverlayModule,
        MatButtonToggleModule,
    ],
    exports: [
        MatButtonModule,
        MatCheckboxModule,
        MatSlideToggleModule,
        MatDatepickerModule,
        MatFormFieldModule,
        MatInputModule,
        MatTabsModule,
        MatDialogModule,
        MatGridListModule,
        MatProgressSpinnerModule,
        MatDialogModule,
        MatToolbarModule,
        MatIconModule,
        MatGridListModule,
        MatListModule,
        MatCardModule,
        MatSliderModule,
        MatMenuModule,
        MatRadioModule,
        MatExpansionModule,
        MatChipsModule,
        MatSnackBarModule,
        MatProgressBarModule,
        MatSelectModule,
        MatTableModule,
        MatAutocompleteModule,
        MatDividerModule,
        MatPaginatorModule,
        MatBadgeModule,
        MatTooltipModule,
        MatSidenavModule,
        MatBottomSheetModule,
        MatStepperModule,
        MatTreeModule,
        MatNativeDateModule,
        MatRippleModule,
        OverlayModule,
        MatButtonToggleModule,
    ],
    // declarations: [ConfirmDlgComponent, SimpleDlgComponent, WaitDlgComponent],
    declarations: [],
    providers: [
        // The locale would typically be provided on the root module of your application. We do it at
        // the component level here, due to limitations of our example generation script.
        { provide: MAT_DATE_LOCALE, useValue: 'ko-KR' },

        // { provide: DateAdapter, useClass: CustomDateAdapter, deps: [MAT_DATE_LOCALE] },
        // { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS },
    ],
    entryComponents: [
    ],
})
export class MaterialModule { }
