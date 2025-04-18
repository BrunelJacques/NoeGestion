import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { BehaviorSubject, map, Observable, startWith, Subject, switchMap, takeUntil } from 'rxjs';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_AUTOCOMPLETE_DEFAULT_OPTIONS, MatAutocompleteDefaultOptions, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { CommonModule } from '@angular/common';
import { Autocomplete } from '../../stocks/_models/params';
import { SharedModule } from '../../shared/shared.modules'

@Component({
  selector: 'app-zz-test',
  templateUrl: './zz-test.component.html',
  styleUrls: ['./zz-test.component.scss'],
  standalone: true,
  imports: [SharedModule, CommonModule],
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

export class ZzTestComponent implements OnInit, OnDestroy {
  @Input() autocomplete: Autocomplete = {
    items$: new BehaviorSubject<string[]>(['un', 'deux', 'deuxième', 'dos', 'trois']),
    selectedItem: 'deux',
    width: '254px'
  };
  @Output() selected = new EventEmitter<string>();
  @Output() modified = new EventEmitter<string>();

  formGroup!: FormGroup;
  filteredItems$ :Observable<string[]> = this.autocomplete.items$;

  myControl = new FormControl('');
  options: string[] = ['One', 'Two', 'Three'];
  filteredOptions!: Observable<string[]>;

  private destroy$ = new Subject<void>();

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );
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
        return this._oldFilter(value);
      }),
      takeUntil(this.destroy$)
    ) || new Observable<string[]>(observer => observer.next([]));

    // useful for debug, but verbose
    this.autocomplete.items$.subscribe(items => {
      console.log('autocomplete.ts init: ', items);
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private _oldFilter(value: string): Observable<string[]> {
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
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }
}
