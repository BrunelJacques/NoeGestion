import { Component, OnInit } from '@angular/core';
import { Mouvement } from '../_models/mouvement';
import { MvtService } from '../_services/mvt.service';
import { ParamsService } from '../_services/params.service'
import { Params, PARAMS } from '../_models/params';
//import { OneSortieComponent } from '../one-sortie/one-sortie.component';
import { DatePipe } from '@angular/common';
import { Constantes } from '@app/constantes';


@Component({
  selector: 'app-sorties',
  templateUrl: './sorties.component.html',
  styleUrls: ['./sorties.component.less']
})

export class SortiesComponent implements OnInit {
  selectedMvt: Mouvement;
  sorties: Mouvement[] = [];
  datePipe = new DatePipe('en-US');
  jour = "";
  loading = true;
  params: Params;

  constantes = Constantes;
  lstorigine_codes = this.constantes.LSTORIGINE_SORTIES.map((x)=>x.code) ;
  lstservice = this.constantes.LSTSERVICE

  mvtsFilter = (mvt: Mouvement) => {
    let ret = true
    // filtre sur le date
    if (mvt.jour != this.datePipe.transform(this.params.jour,'yyyy-MM-dd')) {
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

  constructor(
    private mvtService: MvtService,
    private paramsService: ParamsService,
    ) {}
   

  ngOnInit(): void {
    this.getParams();
    this.getSorties();
  }


  getSorties(): void {
    this.mvtService.getSorties()
      .subscribe({
        next: (data) => {
          // limitation à 100 du nombre de lignes affichées
          this.sorties = data['results'].filter((index: number) => {
            if (index > 100) {return false}; 
            return true});
          // filtrage selon les paramètres choisis
          this.sorties = data['results'].filter(this.mvtsFilter);
        },
        error: (e) => {
          if (e != 'Not Found') {
            console.error(e)
          }
        }
      })
  }
 
  getParams(): void {
    this.loading = true;
    this.paramsService.paramssubj$
      .subscribe({
        next: (data: Params) => {
          this.params = data;
          this.jour = this.datePipe.transform(this.params.jour, 'dd/MM/yyyy');
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

