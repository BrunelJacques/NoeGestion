import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertComponent } from './alert/alert.component';

import { HomeComponent } from './home';
import { NotFoundComponent } from './not-found';
import { HeaderRoutingModule } from './header/header-routing.module';
import { HeaderComponent } from './header/header.component';
import { SubheaderComponent } from './subheader/subheader.component';
import { SubheaderMvtsComponent } from '../stocks/mouvements/subheader-mvts/subheader-mvts.component';
import { HighlightDirective } from '../shared/_directives/highlight.directive';

import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { SharedModule } from '../shared/shared.modules';

// Providers
import { JwtInterceptor } from './_helpers/jwt.interceptor';
import { ErrorInterceptor } from './_helpers/error.interceptor';
import { HandleError } from './_helpers/error.interceptor';


@NgModule({
  declarations: [
    AlertComponent,
    HomeComponent,
    NotFoundComponent,
    HeaderComponent,
    SubheaderComponent,
    SubheaderMvtsComponent,
    HighlightDirective
  ],
  imports: [
    CommonModule,
    HeaderRoutingModule,
    SharedModule
  ],
  exports: [
    AlertComponent,
    HomeComponent,
    NotFoundComponent,
    HeaderComponent,
    SubheaderComponent,
    SubheaderMvtsComponent,
    HighlightDirective,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: HandleError },
  ]
})
export class GeneralModule { }
