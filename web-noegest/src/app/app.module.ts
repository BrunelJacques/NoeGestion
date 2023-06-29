import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { LOCALE_ID } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

//import { fakeBackendProvider } from './general/_helpers';
import { JwtInterceptor, ErrorInterceptor, HandleError } from './general/_helpers';

import { AlertComponent } from './general/_alert';
import { HomeComponent } from './general/home';
import { HeaderModule } from './general/header/header.module';
import { NotFoundComponent } from './general/not-found';
import { NameappliService } from './general/_services/namemodule.service';
import * as fr from '@angular/common/locales/fr';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AlertComponent,
    NotFoundComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    HeaderModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: HandleError },
    { provide: LOCALE_ID, useValue: 'fr-FR'},
    // provider used to create fake backend
    //fakeBackendProvider,
    NameappliService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { 
  constructor() {
    registerLocaleData(fr.default);
  }
}


