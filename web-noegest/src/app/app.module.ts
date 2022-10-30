import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule} from 'angular-in-memory-web-api';
import { InMemoryDataService } from './stocks/_services/in-memory-data.service';
import { fakeBackendProvider } from './general/_helpers';

import { AppRoutingModule } from './app-routing.module';
import { JwtInterceptor, ErrorInterceptor } from './general/_helpers';

import { AlertComponent } from './general/_alert';
import { AppComponent } from './app.component';
import { HomeComponent } from './general/home/home.component';
import { NotFoundComponent } from './general/not-found/not-found.component';
import { HeaderComponent } from './general/header/header.component';
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
    // The HttpClientInMemoryWebApiModule module intercepts HTTP requests
    // and returns simulated server responses.
    // Remove it when a real server is ready to receive requests.
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, { dataEncapsulation: false }
    ),
    AppRoutingModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    // provider used to create fake backend
    fakeBackendProvider,
    ChoixAppliService,
],
  bootstrap: [AppComponent]
})
export class AppModule { }