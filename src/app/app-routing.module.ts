import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HyTarotComponent } from './pages/tarot/hy-tarot/hy-tarot.component';
import { WtTarotComponent } from './pages/tarot/wt-tarot/wt-tarot.component';
import { WelcomeComponent } from './pages/welcome/welcomecomponent';
import { OneNightUltimateWerewolfComponent } from './pages/game/one-night-ultimate-werewolf/one-night-ultimate-werewolf.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/welcome' },

  { path: 'welcome', component: WelcomeComponent },

  { path: 'tarot/wt-tarot', component: WtTarotComponent },
  { path: 'tarot/hy-tarot', component: HyTarotComponent },

  { path: 'game/wolf-kill', component: OneNightUltimateWerewolfComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
