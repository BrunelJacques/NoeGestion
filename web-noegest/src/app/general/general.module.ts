import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AlertComponent } from './_alert';
import { HomeComponent } from './home';
import { NotFoundComponent } from './not-found';
import { HeaderRoutingModule } from './header/header-routing.module';
import { HeaderComponent } from './header/header.component';
import { SubheaderComponent } from './subheader/subheader.component';
import { SubheaderMvtsComponent } from '../stocks/mouvements/subheader-mvts/subheader-mvts.component';

@NgModule({
  declarations: [
    AlertComponent,
    HomeComponent,
    NotFoundComponent,
    HeaderComponent,
    SubheaderComponent,
    SubheaderMvtsComponent
  ],
  imports: [
    CommonModule,
    HeaderRoutingModule
  ],
  exports: [
    AlertComponent,
    HomeComponent,
    NotFoundComponent,
    HeaderComponent,
    SubheaderComponent,
    SubheaderMvtsComponent
  ],
})
export class GeneralModule { }
