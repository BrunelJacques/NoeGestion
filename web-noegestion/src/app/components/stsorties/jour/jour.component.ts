import { Component, OnInit } from '@angular/core';
import { Mouvement } from 'src/app/models/stmouvements';

@Component({
  selector: 'app-jour',
  templateUrl: './jour.component.html',
  styleUrls: ['./jour.component.scss']
})
export class JourComponent implements OnInit {

  mouvement: Mouvement = {
    id: 0,
    article: '',
    nbUnitesVente: 0,
    qteMouvement: 0,
    prixUnit: 0,
    repas: '',
    nbRationsUnit: 0,
    artNbRations: 0,
    qteParUniteVente: 0,
    qteStock: 0,
    magasin: '',
    rayon: '',
    uniteStock: '',
    uniteVente: '',
    fournisseur: ''
  };
  jourString:string = '01/05/2021'
  jour : Date = new Date();

  constructor() { }

  ngOnInit(): void {
  }

}
