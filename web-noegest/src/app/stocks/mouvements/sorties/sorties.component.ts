import { Component, OnInit } from '@angular/core';
import { Mouvement } from '../../_models/mouvement';
import { MvtService } from '../../_services/mvt.service';
import { ParamsService } from '../../_services/params.service'
import { Params } from '../../_models/params';
import { NamemoduleService } from 'src/app/general/_services';
//import { OneSortieComponent } from '../one-sortie/one-sortie.component';
import { DatePipe } from '@angular/common';
import { Constantes } from 'src/app/constantes';
import { DateAnsiToFr } from 'src/app/general/_helpers/fonctions-perso'

@Component({
  selector: 'app-sorties',
  templateUrl: './sorties.component.html',
  styleUrls: ['./sorties.component.css']
})


export class SortiesComponent implements OnInit {
  selectedMvt!: Mouvement;
  sorties!: Mouvement[];
  jour: string | null = ""
  urlparams= "";
  params!: Params;
  nblignesmax = 60;

  constantes = Constantes;
  lstorigine_codes = this.constantes.LSTORIGINE_SORTIES.map((x: { code: unknown })=>x.code) ;
  lstservice = this.constantes.LSTSERVICE
  ansiToFr = DateAnsiToFr

  constructor(
    private namemoduleService: NamemoduleService,
    private paramsService: ParamsService,
    private mvtService: MvtService,
    private datePipe: DatePipe,
    ) {
      this.namemoduleService.setParentName("sorties")
    }

  ngOnInit(): void {
    this.getParams();
    this.getSorties();
  }

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

  getSorties(): void {
    const jour = this.datePipe.transform(this.params.jour, 'yyyy-MM-dd')
    this.urlparams = `/?origine=${this.params.origine}&jour=${jour}`

    this.mvtService.getSorties(this.urlparams)
      .subscribe( 
        data => this.sorties = data['results'].filter(this.mvtsFilter)
      )
  }

  getParams(): void {
    this.paramsService.paramssubj$
      .subscribe({
        next: (data: Params) => {
          this.params = data;
          this.jour = this.datePipe.transform(this.params.jour, 'dd/MM/yyyy');
        },
        error: (e: string) => {
          if (e != 'Not Found') {
            console.error(e)
          }
        }
      });
  }

  onRefresh(): void{
    this.getSorties()
  }

}

