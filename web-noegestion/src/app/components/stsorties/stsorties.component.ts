import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MOUVEMENTS } from 'src/app/models/mock-test-sorties';
import { Mouvement } from 'src/app/models/stmouvements';

@Component({
  selector: 'app-sorties',
  templateUrl: './stsorties.component.html',
  styleUrls: [
    './stsorties.component.scss',
  ],
})

export class StSortiesComponent implements OnInit {
  jour = new Date('2021-05-02');
  //date1 =  new FormControl(new Date());
  origine: String = "Repas en cuisine";
  mvts = MOUVEMENTS
  selectedMvt?: Mouvement;
  rayon = ''
  magasin = ''

  constructor() {}

  ngOnInit(): void {
  }

  onSelect(mvt: Mouvement): void {
    this.selectedMvt = mvt;
    this.rayon = mvt.rayon;
    this.magasin = mvt.magasin;
  }

}



