import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { map, Observable, of, startWith } from 'rxjs';
import { FormControl } from '@angular/forms';
import { MAT_AUTOCOMPLETE_DEFAULT_OPTIONS, MatAutocompleteDefaultOptions, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Autocomplete } from 'src/app/stocks/_models/params';

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
  @Input() autocomplete: Autocomplete = {
        items:(["un","deux","trois"]),
        selectedItem:"deux",
        width:"254px"
  };
  @Output() retour: EventEmitter<string>  = new EventEmitter()

  myControl = new FormControl();
  filteredItems$ :Observable<string[]> = this.autocomplete.items$;
  font: unknown;
  ngOnInit(): void {
    if (this.autocomplete.selectedItem) {
      this.myControl.setValue(this.autocomplete.selectedItem);
    }

    this.filteredItems$ = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
  }

  private _filter(value: string): string[] {
    if (!value || !this.autocomplete.items) {
      return [];
    }
    const filterValue = value.toLowerCase();
    let filteredItems: string[] = [];

    this.autocomplete.items.subscribe(items => {
      filteredItems = items.filter(item => item.toLowerCase().includes(filterValue));
    });

    return filteredItems;
  }

  onSelection(event: MatAutocompleteSelectedEvent): void {
    this.retour.emit(event.option.value);
  }
}
