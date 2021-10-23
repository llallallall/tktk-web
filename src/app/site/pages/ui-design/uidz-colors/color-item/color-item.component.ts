import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { StyleItem } from 'src/app/models/theme/style-item';
import * as _ from 'lodash';


@Component({
  selector: 'app-color-item',
  templateUrl: './color-item.component.html',
  styles: [
  ]
})
export class ColorItemComponent implements OnInit {

  @Input() model: StyleItem;
  value: string;
  @Output() on_changed = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
    this.value = this.model.value
  }

  invertColor0(hex, bw = true) {
    const ftag = `invertColor0(${hex}),`;

    if (hex.indexOf('#') === 0) {
      hex = hex.slice(1);
    }
    // convert 3-digit hex to 6-digits.
    if (hex.length === 3) {
      hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
    }
    if (hex.length !== 6) {
      throw new Error('Invalid HEX color.');
    }
    const r = parseInt(hex.slice(0, 2), 16),
      g = parseInt(hex.slice(2, 4), 16),
      b = parseInt(hex.slice(4, 6), 16);
    if (bw) {
      const ddd = r * 0.299 + g * 0.587 + b * 0.114;
      // console.log(ftag, 'ddd=', ddd);
      // http://stackoverflow.com/a/3943023/112731
      return ddd > 186
        ? '#000000'
        : '#FFFFFF';
    }
    // invert color components
    const r2 = (255 - r).toString(16);
    const g2 = (255 - g).toString(16);
    const b2 = (255 - b).toString(16);
    // pad each with zeros and return
    return "#" + _.padStart(r2, 2, '0') + _.padStart(g2, 2, '0') + _.padStart(b2, 2, '0');
  }

  onClickSubmit() {
    this.model.value = _.trim(this.value);
    this.on_changed.emit(this.value);
  }

}
