import { NgModule } from '@angular/core';
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
import { FooterComponent } from './components/footer/footer.component';
import { StSortiesComponent } from './components/stsorties/stsorties.component';
import { StEntreesComponent } from './components/stentrees/stentrees.component';
import { StentreeComponent } from './components/stentree/stentree.component';
import { StsortieComponent } from './components/stsortie/stsortie.component';
import { SteffectifsComponent } from './components/steffectifs/steffectifs.component';
import { StprixjourneeComponent } from './components/stprixjournee/stprixjournee.component';
import { StinventaireComponent } from './components/stinventaire/stinventaire.component';
import { KmdepartComponent } from './components/kmdepart/kmdepart.component';
import { KmarriveeComponent } from './components/kmarrivee/kmarrivee.component';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    StSortiesComponent,
    StEntreesComponent,
    StentreeComponent,
    StsortieComponent,
    SteffectifsComponent,
    StprixjourneeComponent,
    StinventaireComponent,
    KmdepartComponent,
    KmarriveeComponent,
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
    ReactiveFormsModule 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
