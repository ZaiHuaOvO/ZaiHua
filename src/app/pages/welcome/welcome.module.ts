import { NgModule } from '@angular/core';

import { WelcomeComponent } from './welcomecomponent';
import { WelcomeRoutingModule } from './welcome-routing.module';



@NgModule({
  imports: [WelcomeRoutingModule],
  declarations: [WelcomeComponent],
  exports: [WelcomeComponent]
})
export class WelcomeModule { }
