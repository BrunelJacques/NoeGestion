import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
//import { fakeBackendProvider } from './general/_helpers';

import { AppRoutingModule } from './app-routing.module';
import { JwtInterceptor, ErrorInterceptor } from './general/_helpers';

import { AlertComponent } from './general/_alert';
import { AppComponent } from './app.component';
import { HomeComponent } from './general/home';
import { NotFoundComponent } from './general/not-found';
import { HeaderComponent } from './general/header';
import { ChoixAppliService } from './general/_services/choix-appli.service';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AlertComponent,
    NotFoundComponent,
    HeaderComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    // provider used to create fake backend
    //fakeBackendProvider,
    ChoixAppliService,
],
  bootstrap: [AppComponent]
})
export class AppModule { }