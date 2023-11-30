import { NgModule } from '@angular/core';

import { IndexComponent } from './index.component';
import { IndexRoutingModule } from './index-routing.module';



@NgModule({
  imports: [IndexRoutingModule],
  declarations: [IndexComponent],
  exports: [IndexComponent]
})
export class IndexModule { }
