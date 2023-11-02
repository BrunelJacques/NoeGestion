import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertComponent } from './alert/alert.component';

import { HomeComponent } from './home';
import { NotFoundComponent } from './not-found';
import { HeaderRoutingModule } from './header/header-routing.module';
import { HeaderComponent } from './header/header.component';
import { SubheaderComponent } from './subheader/subheader.component';
import { SubheaderMvtsComponent } from '../stocks/mouvements/subheader-mvts/subheader-mvts.component';
import { HideOptionsOnClickDirective } from './_directives/hideOptions.directive';
import { HighlightDirective } from './_directives/highlight.directive';

@NgModule({
  declarations: [
    AlertComponent,
    HomeComponent,
    NotFoundComponent,
    HeaderComponent,
    SubheaderComponent,
    SubheaderMvtsComponent,
    HideOptionsOnClickDirective,
    HighlightDirective
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
    SubheaderMvtsComponent,
    HideOptionsOnClickDirective,
    HighlightDirective
  ],
})
export class GeneralModule { }
