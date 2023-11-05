import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';

import { LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import * as fr from '@angular/common/locales/fr';

// Providers
import { JwtInterceptor } from './general/_helpers/jwt.interceptor';
import { ErrorInterceptor } from './general/_helpers/error.interceptor';
import { HandleError } from './general/_helpers/error.interceptor';
import { DatePipe } from '@angular/common';

// ici ceux qui sont appelés par <app-xxx></app-xxx>
import { GeneralModule } from './general/general.module';
import { StocksModule } from './stocks/stocks.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    GeneralModule, // declarations 'general' 
    StocksModule, BrowserAnimationsModule, // declarations 'stocks'
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: HandleError },
    { provide: LOCALE_ID, useValue: 'fr-FR'},
    { provide: DatePipe },

  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor() {
    registerLocaleData(fr.default);
  }
}


