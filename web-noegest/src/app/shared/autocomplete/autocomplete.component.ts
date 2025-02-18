import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { map, Observable, of, startWith, Subject, Subscription, switchMap, takeUntil } from 'rxjs';
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

export class AutocompleteComponent implements OnInit, OnDestroy {
  @Input() autocomplete: Autocomplete = {
        items$:of(["default","value","of autocomplete.items$"]),
        selectedItem:"deux",
        width:"254px"
  };
  @Output() retour: EventEmitter<string>  = new EventEmitter()

  myControl = new FormControl();
  filteredItems$ :Observable<string[]> = this.autocomplete.items$;
  font: unknown;
  private destroy$ = new Subject<void>();
  

  ngOnInit(): void {
    if (this.autocomplete.selectedItem ) {
      this.myControl.setValue(this.autocomplete.selectedItem)
    }

    // Set up the filteredItems$ Observable to filter items based on input value
    this.filteredItems$ = this.myControl.valueChanges.pipe(
      startWith(''),
      switchMap(value => this._filter(value))
    );

    this.autocomplete.items$
      .pipe( takeUntil(this.destroy$))
      .subscribe(items => {
        console.log('autocomplete.ts init: ', items);
      })
  }

  ngOnDestroy(): void {
    // Emit a value to signal unsubscription
    this.destroy$.next();
    this.destroy$.complete();
  }

  private _filter(value: string): Observable<string[]> {
    if (!value || !this.autocomplete.items$) {
      return this.autocomplete.items$;
    }
    const filterValue = value.toLowerCase();

    // Return a new Observable that emits the filtered items
    return this.autocomplete.items$.pipe(
      map(items => items.filter(item => item.toLowerCase().includes(filterValue)))
    );
  }

  onSelection(event: MatAutocompleteSelectedEvent): void {
    this.retour.emit(event.option.value);
  }
}
