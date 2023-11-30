import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WtTarotComponent } from './wt-tarot/wt-tarot.component';
import { HyTarotComponent } from './hy-tarot/hy-tarot.component';

const routes: Routes = [
  { path: 'wt-tarot', component: WtTarotComponent },
  { path: 'hy-tarot', component: HyTarotComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TarotRoutingModule { }
