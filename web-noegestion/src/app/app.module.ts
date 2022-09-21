import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemDtServMvts } from './models/in-memory-data.service';
//import { InMemDtServCamps } from './models/in-memory-data.service';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule, ROUTES } from './app-routing.module';
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
import { LoginComponent } from './components/general/home/login/login.component';
import { MessagesComponent } from './components/general/messages/messages.component';
import { ParamsComponent } from './components/stsorties/params/params.component';
import { UserService } from './services/user.service';
import { SortieComponent } from './components/stsorties/sortie/sortie.component';
import { SortieService } from './services/sortie.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from "@angular/router";
import { RepasComponent } from './components/stsorties/params/repas/repas.component';
import { CampComponent } from './components/stsorties/params/camp/camp.component';
import { CompteComponent } from './components/general/home/compte/compte.component';
//import { Constantes } from './services/general/constantes'


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
    ParamsComponent,
    KmDepartComponent,
    KmArriveeComponent,
    CustomDatePipe,
    LoginComponent,
    MessagesComponent,
    SortieComponent,
    RepasComponent,
    CampComponent,
    CompteComponent,
    //Constantes,
  ],
  imports: [
    HttpClientModule,
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule,
     // The HttpClientInMemoryWebApiModule module intercepts HTTP requests
    // and returns simulated server responses.
    // Remove it when a real server is ready to receive requests.
    //HttpClientInMemoryWebApiModule.forRoot(
    //  InMemDtServMvts, { dataEncapsulation: false }
    //),
     NgbModule,
    RouterModule.forRoot(ROUTES)
  ],

  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  providers: [
    UserService,
    SortieService
  ],
  bootstrap: [AppComponent]
})

export class AppModule {
  }
