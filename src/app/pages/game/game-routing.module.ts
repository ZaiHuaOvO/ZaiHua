import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OneNightUltimateWerewolfComponent } from './one-night-ultimate-werewolf/one-night-ultimate-werewolf.component';

const routes: Routes = [
  { path: 'wolf-kill', component: OneNightUltimateWerewolfComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GameRoutingModule { }
