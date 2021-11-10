import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FILTRES } from 'src/app/models/filtres';

@Component({
  selector: 'app-stfiltres',
  templateUrl: './stfiltres.component.html',
  styleUrls: ['./stfiltres.component.css']
})
export class StFiltresComponent implements OnInit {
  filtres= FILTRES;

  constructor(
    private location: Location
  ) {
    this.location = location
   }

  ngOnInit(): void {}

  goBack(): void {
    this.location.back();
  }
}
