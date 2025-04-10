import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { BehaviorSubject, map, Observable, startWith, Subject, switchMap, takeUntil } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
    ],
    standalone: false
})

export class AutocompleteComponent implements OnInit, OnDestroy {
  @Input() autocomplete: Autocomplete = {
    items$: new BehaviorSubject<string[]>(['un', 'deux', 'trois']),
    selectedItem: 'deux',
    width: '254px'
  };
  @Output() selected: EventEmitter<string> = new EventEmitter();
  @Output() modified: EventEmitter<string> = new EventEmitter();

  formGroup!: FormGroup;
  filteredItems$ :Observable<string[]> = this.autocomplete.items$;
  private destroy$ = new Subject<void>();

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    // Initialize form group with required validator
    this.formGroup = this.fb.group({
      myControl: ['', Validators.required]
    });

    if (this.autocomplete.selectedItem ) {
      this.formGroup.get('myControl')?.setValue(this.autocomplete.selectedItem);
    }

    // Set up the filteredItems$ Observable to filter items based on input value
    this.filteredItems$ = this.formGroup.get('myControl')?.valueChanges?.pipe(
      startWith(''),
      switchMap(value => {
        this.modified.emit(value); // Emit the modified text
        return this._filter(value);
      }),
      takeUntil(this.destroy$)
    ) || new Observable<string[]>(observer => observer.next([]));

    // useful for debug, but verbose
    this.autocomplete.items$.subscribe(items => {
      console.log('autocomplete.ts init nb et first: ', items.length,items[0]);
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
