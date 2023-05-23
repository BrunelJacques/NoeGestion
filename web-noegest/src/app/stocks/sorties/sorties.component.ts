import { Component, OnInit } from '@angular/core';
import { Mouvement } from '../_models/mouvement';
import { MvtService } from '../_services/mvt.service';
import { ParamsService } from '../_services/params.service'
import { Params, PARAMS } from '../_models/params';
//import { OneSortieComponent } from '../one-sortie/one-sortie.component';
import { DatePipe } from '@angular/common';
import { first, map } from 'rxjs';
import { AlertService } from '@app/general/_services';
import { Constantes } from '@app/constantes';

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

  constantes = Constantes
  lstorigine_codes = this.constantes.LSTORIGINE_SORTIES.map((x)=>x.code) ;
  lstservice = this.constantes.LSTSERVICE

  constructor(
    private mvtService: MvtService,
    private paramsService: ParamsService,
    public datepipe: DatePipe,
    ) {
      this.getParams();
      this.getSorties();
     }

  ngOnInit(): void {}


  filtre(mvt: Mouvement){
    let ret = true
    // filtre sur le date
    if (this.pipe.transform(mvt.jour) != this.pipe.transform(this.params.jour)) {
      ret = false
    }
    // filtre sur le type d'origine du mouvement
    else if ( !this.lstorigine_codes.includes(mvt.origine )) {
      ret = false
    }
    // filtre sur l'origine filtrée du mouvement
    else if ((this.params.origine != 'tout') && (mvt.origine != this.params.origine)) {
      ret = false
    }
    // filtre sur le service
    else if (
      (mvt.origine == 'repas')
        && (this.params.origine != 'tout')
        && (this.params.service != 0)
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


  getParams(): void {
    this.loading = true;
    this.paramsService.paramssubj
      .subscribe({
        next: (data: Params) => {
          this.params = data;
          this.jour = this.pipe.transform(this.params.jour, 'dd/MM/yyyy');
          this.loading = false
        },
        error: (e: string) => {
          if (e != 'Not Found') {
            console.error(e)
          }
        }
      });
  }

}

