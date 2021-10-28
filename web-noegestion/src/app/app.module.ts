import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CdkAccordionModule } from '@angular/cdk/accordion';

import { MatSliderModule } from '@angular/material/slider';

import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import {MatExpansionModule} from '@angular/material/expansion';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/header/footer/footer.component';
import { StSortiesComponent } from './components/stsorties/stsorties.component';
import { StEntreesComponent } from './components/stentrees/stentrees.component';
import { StentreeComponent } from './components/stentrees/stentree/stentree.component';
import { StsortieComponent } from './components/stsorties/stsortie/stsortie.component';
import { StEffectifsComponent } from './components/steffectifs/steffectifs.component';
import { StPrixJourneeComponent } from './components/stprixjournee/stprixjournee.component';
import { StInventaireComponent } from './components/stinventaire/stinventaire.component';
import { KmDepartComponent } from './components/kmdepart/kmdepart.component';
import { KmArriveeComponent } from './components/kmarrivee/kmarrivee.component';
import {CustomDatePipe} from './models/custom.datepipe';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { LoginComponent } from './components/login/login.component';

@NgModule({
  declarations: [
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
  ],
  imports: [
    HttpClientModule,
    BrowserAnimationsModule,
    MatSliderModule,
    MatToolbarModule,
    MatIconModule,
    MatMenuModule,
    MatSidenavModule,
    MatListModule,
    CdkAccordionModule,
    MatExpansionModule,
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
