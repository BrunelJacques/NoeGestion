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
import { AlertComponent } from './general/_alert';
import { ArticleSearchComponent } from './stocks/mouvements/article-search/article-search.component';
import { HeaderModule } from './general/header/header.module';
import { HomeComponent } from './general/home';
import { NotFoundComponent } from './general/not-found';
import { OneSortieComponent } from './stocks/mouvements/one-sortie/one-sortie.component';
import { ParamsComponent } from './stocks/params/params.component';
import { AppComponent } from './app.component'; //app-root
import { SubheaderComponent } from './general/subheader/subheader.component';
import { SubheaderMvtsComponent } from './stocks/mouvements/subheader-mvts/subheader-mvts.component';


@NgModule({
  declarations: [
    AlertComponent,
    ArticleSearchComponent,
    AppComponent,
    HomeComponent,
    NotFoundComponent,
    SubheaderComponent,
    SubheaderMvtsComponent,
    OneSortieComponent,
    ParamsComponent,
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


