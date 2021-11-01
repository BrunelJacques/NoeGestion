import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CdkAccordionModule } from '@angular/cdk/accordion';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HomeComponent } from './components/general/home/home.component';
import { HeaderComponent } from './components/general/header/header.component';
import { FooterComponent } from './components/general/footer/footer.component';
import { StSortiesComponent } from './components/stsorties/stsorties.component';
import { StEntreesComponent } from './components/stentrees/stentrees.component';
import { StentreeComponent } from './components/stentrees/stentree/stentree.component';
import { StsortieComponent } from './components/stsorties/stsortie/stsortie.component';
import { StEffectifsComponent } from './components/steffectifs/steffectifs.component';
import { StPrixJourneeComponent } from './components/stprixjournee/stprixjournee.component';
import { StInventaireComponent } from './components/stinventaire/stinventaire.component';
import { KmDepartComponent } from './components/kmdepart/kmdepart.component';
import { KmArriveeComponent } from './components/kmarrivee/kmarrivee.component';
import { CustomDatePipe } from './models/custom.datepipe';
import { LoginComponent } from './components/general/login/login.component';
import { MessagesComponent } from './components/general/messages/messages.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [
    HomeComponent,
    AppComponent,
    HeaderComponent,
    FooterComponent,
    StSortiesComponent,
    StEntreesComponent,
    StentreeComponent,
    StsortieComponent,
    StEffectifsComponent,
    StPrixJourneeComponent,
    StInventaireComponent,
    KmDepartComponent,
    KmArriveeComponent,
    CustomDatePipe,
    LoginComponent,
    MessagesComponent,
  ],
  imports: [
    HttpClientModule,
    BrowserAnimationsModule,
    CdkAccordionModule,
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FontAwesomeModule,
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
