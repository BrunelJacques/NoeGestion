import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable, map, startWith } from 'rxjs';
import { FormControl } from '@angular/forms';
import { MAT_AUTOCOMPLETE_DEFAULT_OPTIONS, MatAutocompleteDefaultOptions, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

@Component({
  selector: 'app-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.scss'],
  providers: [
    {
      provide: MAT_AUTOCOMPLETE_DEFAULT_OPTIONS,
      useValue: { 
        autoActiveFirstOption: true,
        // false pour 'startsWith', true pour 'contains' 
        disableRipple: false, } as MatAutocompleteDefaultOptions
    }
  ]
})

export class AutocompleteComponent implements OnInit {
  @Input() kwds: {
                  items: string[]; 
                  selectedItem?: string;
                  width?: string
  } = {
        items:["un","deux","trois"],
        width:"254px"
  };
  @Output() retour: EventEmitter<string>  = new EventEmitter()

  myControl = new FormControl();
  filteredItems: Observable<string[]>;
  font: unknown;

  constructor( ) {
    this.filteredItems = this.myControl.valueChanges
    .pipe(
      startWith(''),
      map(value => this._filter(value))
    );
  }

  ngOnInit(): void {
    if (this.kwds.selectedItem) { 
      this.myControl.setValue(this.kwds.selectedItem); 
    }
  }

  _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.kwds.items.filter(item => item.toLowerCase().includes(filterValue));
  }

  onSelection(event: MatAutocompleteSelectedEvent): void {
    this.retour.emit(event.option.value)
  }
}
