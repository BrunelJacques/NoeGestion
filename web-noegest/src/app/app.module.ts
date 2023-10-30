import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';

import { LOCALE_ID } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import * as fr from '@angular/common/locales/fr';

//import { fakeBackendProvider } from './general/_helpers';
import { JwtInterceptor, ErrorInterceptor, HandleError } from './general/_helpers';


import { SharedService } from './general/_services/shared.service';
import { DatePipe } from '@angular/common';

// ici ceux qui sont appelés par <app-xxx></app-xxx>
import { GeneralModule } from './general/general.module';
import { StocksModule } from './stocks/stocks.module';
import { AppComponent } from './app.component';
import { ZzdynamicFormComponent } from './zzdynamic-form/zzdynamic-form.component';

@NgModule({
  declarations: [
    AppComponent,
    ZzdynamicFormComponent,//app-root
  ],
  imports: [
    CommonModule,
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    GeneralModule, // declarations 'general' 
    StocksModule, // declarations 'stocks'
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: HandleError },
    { provide: LOCALE_ID, useValue: 'fr-FR'},
    { provide: DatePipe },
    // provider used to create fake backend
    //fakeBackendProvider,
    SharedService,

  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor() {
    registerLocaleData(fr.default);
  }
}


