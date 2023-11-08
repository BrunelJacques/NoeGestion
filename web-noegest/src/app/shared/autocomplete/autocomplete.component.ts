import { Component, Input } from '@angular/core';
import { Observable, map, startWith } from 'rxjs';
import { FormControl } from '@angular/forms';
import { MAT_AUTOCOMPLETE_DEFAULT_OPTIONS, MatAutocompleteDefaultOptions } from '@angular/material/autocomplete';


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

export class AutocompleteComponent {
  @Input() kwds: {
                  items: string[]; 
                  width: string
  } = {
        items:["un","deux","trois"],
        width:"250px"
  };

  myControl = new FormControl();
  filteredItems: Observable<string[]>;

  constructor(
  ) {
    this.filteredItems = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.kwds.items.filter(item => item.toLowerCase().includes(filterValue));
  }
}
