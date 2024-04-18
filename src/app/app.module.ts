import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { zh_CN } from 'ng-zorro-antd/i18n';
import { CommonModule, registerLocaleData } from '@angular/common';
import zh from '@angular/common/locales/zh';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IconsProviderModule } from './icons-provider.module';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { WelcomeComponent } from './pages/welcome/welcomecomponent';
import { WtTarotComponent } from './pages/tarot/wt-tarot/wt-tarot.component';
import { HyTarotComponent } from './pages/tarot/hy-tarot/hy-tarot.component';
import { OneNightUltimateWerewolfComponent } from './pages/game/one-night-ultimate-werewolf/one-night-ultimate-werewolf.component';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDescriptionsModule } from 'ng-zorro-antd/descriptions';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzStepsModule } from 'ng-zorro-antd/steps';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { GlobalErrorHandler } from './global-error-handler.service';
import { NzFlexModule } from 'ng-zorro-antd/flex';
registerLocaleData(zh);

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    WtTarotComponent,
    HyTarotComponent,
    OneNightUltimateWerewolfComponent
  ],
  imports: [
    CommonModule,
    NzGridModule,
    NzDividerModule,
    NzButtonModule,
    NzDescriptionsModule,
    NzTypographyModule,
    NzDrawerModule,
    NzTableModule,
    NzModalModule,
    NzFormModule,
    ReactiveFormsModule,
    NzInputModule,
    NzInputNumberModule,
    NzSelectModule,
    NzStepsModule,
    NzMessageModule,
    NzToolTipModule,
    NzFlexModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    IconsProviderModule,
    NzLayoutModule,
    NzMenuModule,
    AppRoutingModule,
  ],
  providers: [
    { provide: NZ_I18N, useValue: zh_CN },
    { provide: ErrorHandler, useClass: GlobalErrorHandler }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
