import { Component } from '@angular/core';
import { Observable, map, startWith } from 'rxjs';
import { FormControl } from '@angular/forms';



@Component({
  selector: 'app-inventaire',
  templateUrl: './inventaire.component.html',
})

export class InventaireComponent  {
  items = ["Premier d'une longue série", 'Deuxième', 'Troisième', 'Quatrième', 'Cinquième'];

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
    return this.items.filter(item => item.toLowerCase().includes(filterValue));
  }
}

