import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable, startWith } from 'rxjs';
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
        selectedItem:"qsd",
        width:"254px"
  };
  @Output() retour: EventEmitter<string>  = new EventEmitter()

  myControl = new FormControl();
  filteredItems$ :Observable<string[]> = new Observable(observer => observer.next(this.kwds.items))  ;
  font: unknown;

  ngOnInit(): void {
    if (this.kwds.selectedItem) { 
      this.myControl.setValue(this.kwds.selectedItem); 
    }
    this.myControl.valueChanges
      .pipe(
        startWith(''),
      )
      .subscribe(value => {
        const filtered = this._filter(value);
        if (filtered.length === 0 && value.trim()) {
          console.log('autocomplete item not found: ',value)
          this.retour.emit(value.trim());
        } else {
          this.filteredItems$ = new Observable(observer => observer.next(filtered));
        }
      });   
  }

  _filter(value: string): string[] {
    if ((value == '') || !this.kwds.items) {
      return this.kwds.items
    } 
    const filterValue = value.toLowerCase();
    return this.kwds.items.filter(item => item.toLowerCase().includes(filterValue));
  }

  onSelection(event: MatAutocompleteSelectedEvent): void {
    this.retour.emit(event.option.value)
  }
}
