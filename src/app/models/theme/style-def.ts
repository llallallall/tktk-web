import * as _ from 'lodash';
import * as moment from 'moment';
import { SiteModel } from '../site/site.model';
import { StyleItem } from './style-item';

export class StyleDef {

    static readonly ut_a = [
        new StyleItem('--primary-org', '#32cd32'),
        new StyleItem('--secondary-org', '#33cdcd'),
        new StyleItem('--accent-org', '#b52cb5'),
        new StyleItem('--cu-warn-color', '#f3120b'),
        new StyleItem('--page-title-text-color', '#707070'),
        new StyleItem('--select-text-color', '#707070'),
        new StyleItem('--bg-test', '#111'),
    ];

    static readonly ut_b = [
        new StyleItem('--primary-org', '#0040d4'),
        new StyleItem('--secondary-org', '#3f6fdd'),
        new StyleItem('--accent-org', '#6d3aa0'),
        new StyleItem('--cu-warn-color', '#f3120b'),
        new StyleItem('--page-title-text-color', '#101010'),
        new StyleItem('--select-text-color', '#707070'),
        new StyleItem('--bg-test', '#999'),
    ];

    static readonly ut_c = [
        new StyleItem('--primary-org', '#fff453'),
        new StyleItem('--secondary-org', '#f6c314'),
        new StyleItem('--accent-org', '#4f1c77'),
        new StyleItem('--cu-warn-color', '#f3120b'),
        new StyleItem('--page-title-text-color', '#303030'),
        new StyleItem('--select-text-color', '#707070'),
        new StyleItem('--bg-test', '#555'),
    ];


    static getItems(uiType: string): StyleItem[] {
        switch (uiType) {
            case SiteModel.UiType.ut_a: return StyleDef.ut_a;
            case SiteModel.UiType.ut_b: return StyleDef.ut_b;
            case SiteModel.UiType.ut_c: return StyleDef.ut_c;
        }
    }

}
