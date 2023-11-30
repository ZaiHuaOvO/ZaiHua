import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/index' },
  { path: 'index', loadChildren: () => import('./pages/index/index.module').then(m => m.IndexModule) },
  { path: 'tarot', loadChildren: () => import('./pages/tarot/tarot.module').then(m => m.TarotModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
