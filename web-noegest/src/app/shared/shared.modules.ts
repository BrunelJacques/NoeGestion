import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";

// constructor  SharedModule
import { CommonModule, registerLocaleData } from '@angular/common';
import * as fr from '@angular/common/locales/fr';

// Providers
import { LOCALE_ID } from '@angular/core';
import { DatePipe } from '@angular/common';

// Material
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

// Fait maison
import { AutocompleteComponent } from "./autocomplete/autocomplete.component";

@NgModule({
  declarations: [
    AutocompleteComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatListModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatRadioModule,
    MatProgressSpinnerModule,
    MatAutocompleteModule,
  ],
  exports: [
    ReactiveFormsModule,
    AutocompleteComponent,
    MatCardModule,
    MatListModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatRadioModule,
    MatProgressSpinnerModule,
    MatAutocompleteModule,
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'fr-FR'},
    { provide: DatePipe },
  ]
})

export class SharedModule {
  constructor() {
    registerLocaleData(fr.default);
  }
}
