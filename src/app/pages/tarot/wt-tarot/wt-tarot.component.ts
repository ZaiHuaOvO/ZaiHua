import { Component } from '@angular/core';
import { wtTarotMajor, wtTarotMinor } from '../tarot-data';

@Component({
  selector: 'app-wt-tarot',
  templateUrl: './wt-tarot.component.html',
  styleUrls: ['./wt-tarot.component.scss']
})
export class WtTarotComponent {
  wtTarotMajor = wtTarotMajor;
  wtTarotMinor = wtTarotMinor;
  visible = false;
  img = '';
  data = {
    text: '',
    id: '',
    detail: {
      upright: '',
      reversed: ''
    },
    note: '',
    img: '',
    imgDetail: [],
    upright: '',
    reversed: ''
  };
  constructor(
  ) {
  }

  openDrawer(tarot: any): void {
    this.data = tarot;
    this.img = this.data['img']
    this.open();
  }

  open(): void {
    this.visible = true;
  }

  close(): void {
    this.visible = false;
    this.data = {
      text: '',
      id: '',
      detail: {
        upright: '',
        reversed: ''
      },
      note: '',
      img: '',
      imgDetail: [],
      upright: '',
      reversed: ''
    };
  }
}
