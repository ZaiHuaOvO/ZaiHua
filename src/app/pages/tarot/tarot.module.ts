import { NgModule } from '@angular/core';

import { TarotRoutingModule } from './tarot-routing.module';

import { WtTarotComponent } from './wt-tarot/wt-tarot.component';
import { HyTarotComponent } from './hy-tarot/hy-tarot.component';
import { CommonModule } from '@angular/common';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NzDescriptionsModule } from 'ng-zorro-antd/descriptions';
import { NzTypographyModule } from 'ng-zorro-antd/typography'

@NgModule({
  imports: [
    CommonModule,
    NzGridModule,
    NzDividerModule,
    NzButtonModule,
    NzDrawerModule,
    NzDescriptionsModule,
    NzTypographyModule,

    TarotRoutingModule,
  ],
  declarations: [
    WtTarotComponent,
    HyTarotComponent
  ],
  exports: [
    WtTarotComponent,
    HyTarotComponent
  ]
})
export class TarotModule { }
