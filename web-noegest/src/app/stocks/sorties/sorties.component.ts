import { Component, OnInit } from '@angular/core';
import { Mouvement } from '../_models/mouvement';
import { MvtService } from '../_services/mvt.service';
import { Location } from '@angular/common';
import { Params } from '../_models/params';
import { hoursDelta } from '../../general/_helpers/fonctions-perso';
import { OneSortieComponent } from '../one-sortie/one-sortie.component';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-sorties',
  templateUrl: './sorties.component.html',
  styleUrls: ['./sorties.component.less']
})

export class SortiesComponent implements OnInit {
  params = new Params
  selectedMvt?: Mouvement;
  sorties: Mouvement[] = [];
  today: Date = new Date();
  pipe = new DatePipe('en-US');
  jour = null;
  parent = Location

  constructor(
    private mvtService: MvtService,
    public datepipe: DatePipe
    ) {
      this.getParams();
      this.getSorties();  
     }

  ngOnInit(): void {
  }

  getSorties(): void {
    this.mvtService.getSorties()
      .subscribe({
        next: (data) => {
          this.sorties = data;
        },
        error: (e) => {
          if (e != 'Not Found') {
            console.error(e)
          }
        }
      });
  }

  ajusteParams(params:Params){
    if (hoursDelta(new Date(params.modif),new Date()) > 6) {
      console.log(params.jour)
      console.log(this.today)
      //params.jour = new Date()
    };
    return params
  }

  getParams(): void {
    this.mvtService.getParams()
      .subscribe({
        next: (data) => {
          this.params = this.ajusteParams(data[0]);
          this.jour = this.pipe.transform(this.params.jour, 'dd/MM/yyyy')
        },
        error: (e) => {
          if (e != 'Not Found') {
            console.error(e)
          }
        }
      });
    console.log(this.jour) 
    }


}

