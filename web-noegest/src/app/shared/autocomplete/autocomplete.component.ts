import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { BehaviorSubject, map, Observable, startWith, Subject, switchMap, takeUntil } from 'rxjs';
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
        disableRipple: false // false for 'startsWith', true for 'contains'
      } as MatAutocompleteDefaultOptions
    }
  ]
})

export class AutocompleteComponent implements OnInit, OnDestroy {
  @Input() autocomplete: Autocomplete = {
    items$: new BehaviorSubject<string[]>(['un', 'deux', 'trois']),
    selectedItem: 'deux',
    width: '254px'
  };
  @Output() selected: EventEmitter<string> = new EventEmitter();
  @Output() modified: EventEmitter<string> = new EventEmitter();

  myControl = new FormControl();
  filteredItems$ :Observable<string[]> = this.autocomplete.items$;
  private destroy$ = new Subject<void>();


  ngOnInit(): void {
    if (this.autocomplete.selectedItem ) {
      this.myControl.setValue(this.autocomplete.selectedItem)
    }

    // Set up the filteredItems$ Observable to filter items based on input value
    this.filteredItems$ = this.myControl.valueChanges.pipe(
      startWith(''),
      switchMap(value => {
          this.modified.emit(value); // Emit the modified text
        return this._filter(value);
      }),
      takeUntil(this.destroy$)
    );

    // useful for debug, but verbose
    this.autocomplete.items$.subscribe(items => {
      console.log('autocomplete.ts init: ', items);
    });
  }

  ngOnDestroy(): void {
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

  onSelected(event: MatAutocompleteSelectedEvent): void {
    this.selected.emit(event.option.value);
  }

  onModified(event: MatAutocompleteSelectedEvent): void {
    this.modified.emit(event.option.value);
  }

}
