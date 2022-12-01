import { Component, OnInit } from '@angular/core';
import { Mouvement } from '../_models/mouvement';
import { MvtService } from '../_services/mvt.service';
import { Params, PARAMS } from '../_models/params';
import { hoursDelta, deepCopy } from '../../general/_helpers/fonctions-perso';
import { OneSortieComponent } from '../one-sortie/one-sortie.component';
import { DatePipe } from '@angular/common';
import { first, map } from 'rxjs';
import { AlertService } from '@app/general/_services';

@Component({
  selector: 'app-sorties',
  templateUrl: './sorties.component.html',
  styleUrls: ['./sorties.component.less']
})

export class SortiesComponent implements OnInit {
  params0 = PARAMS
  params = new Params
  selectedMvt?: Mouvement;
  sorties: Mouvement[] = [];
  pipe = new DatePipe('en-US');
  jour = "";
  loading = true

  constructor(
    private mvtService: MvtService,
    public datepipe: DatePipe,
    private alertService: AlertService
    ) {
      this.getParams();
      this.getSorties();
     }

  ngOnInit(): void {
  }


  filtre(mvt){
    let ret = true
    // filtre sur le date
    if (this.pipe.transform(mvt.jour) != this.pipe.transform(this.params.jour)) {
      ret = false
    }
    // filtre sur l'origine du mouvement
    if ((this.params.origine != 'tout') && (mvt.origine != this.params.origine)) {
      ret = false
    }
    // filtre sur le service
    if (
      (mvt.origine == 'repas') 
        && (this.params.origine != 'tout') 
        && (this.params.service != 'tous')
        && (mvt.service != this.params.service)
      ){
      ret = false
    }
    return ret
  }

  getSorties(): any {
    this.mvtService.getSorties()
    .pipe(map(data => data.filter(mvt => this.filtre(mvt))))
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
    // >6 heures après le dernier paramétrage, on réinitialise Params
    params.parent = "sorties"
    if (hoursDelta(new Date(params.modif),new Date()) > 6) {
      params = deepCopy(this.params0)
      params.parent = "raz-sorties"
    };
    this.mvtService.setParams(params)
      .pipe(first())
      .subscribe({
          next: () => {},
          error: error => {this.alertService.error("");}
          });
    return params
  }

  getParams(): void {
    this.loading = true;
    this.mvtService.getParams()
      .subscribe({
        next: (data) => {
          this.params = this.ajusteParams(data[0]);
          this.jour = this.pipe.transform(this.params.jour, 'dd/MM/yyyy')
          this.loading = false
        },
        error: (e) => {
          if (e != 'Not Found') {
            console.error(e)
          }
        }
      });
  }

}

