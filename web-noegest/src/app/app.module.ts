import { LOCALE_ID, NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';

// ici les sous modules
import { GeneralModule } from './general/general.module';
import { SharedModule } from './shared/shared.modules';
import { StocksModule } from './stocks/stocks.module';
import { ZzTestComponent } from './zz-test/zz-test.component';

registerLocaleData(localeFr,'fr')


@NgModule({
  imports: [
    AppComponent,
    ZzTestComponent,
    AppRoutingModule,
    BrowserAnimationsModule, // contient BrowserModule à ne charger qu'une seule fois
    GeneralModule, // reprend les declarations 'general'
    SharedModule,
    StocksModule,
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'fr' }
  ]
})
export class AppModule {}


