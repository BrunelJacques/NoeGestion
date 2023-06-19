import { Component, OnInit } from '@angular/core';
import { Mouvement } from '../_models/mouvement';
import { MvtService } from '../_services/mvt.service';
import { ParamsService } from '../_services/params.service'
import { Params } from '../_models/params';
import { AlertService, NamemoduleService } from 'src/app/general/_services';
//import { OneSortieComponent } from '../one-sortie/one-sortie.component';
import { DatePipe } from '@angular/common';
import { Constantes } from 'src/app/constantes';


@Component({
  selector: 'app-sorties',
  templateUrl: './sorties.component.html',
  styleUrls: ['./sorties.component.less']
})

export class SortiesComponent implements OnInit {
  selectedMvt!: Mouvement;
  sorties: Mouvement[] = [];
  jour = ""
  origine = ""
  urlparams= "";
  params!: Params;
  nblignesmax = 60;

  constantes = Constantes;
  lstorigine_codes = this.constantes.LSTORIGINE_SORTIES.map((x: { code })=>x.code) ;
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
    private namemoduleService: NamemoduleService,
    private mvtService: MvtService,
    private paramsService: ParamsService,
    private alertService: AlertService,
    private datePipe: DatePipe,
    ) { this.namemoduleService.setParentName("sorties") }


  ngOnInit(): void {
    this.getParams();
    this.getSorties();
  }

  getSorties(): void {
    const jour = this.datePipe.transform(this.params.jour, 'yyyy-MM-dd')
    this.urlparams = `/?origine=${this.origine}&jour=${jour}`
    this.mvtService.getSorties(this.urlparams)
      .subscribe({
        next: (data) => {
          // limitation du nombre de lignes affichées
          this.sorties = data['results']
            .filter((mvt:Mouvement, index: number) => {
              if (index > this.nblignesmax)
              { return false }
              {return true}
            });
          // filtrage selon les paramètres choisis
          this.sorties = this.sorties.filter(this.mvtsFilter);
          if (data['count'] > this.nblignesmax) {
            this.alertService.warn(`Seulement ${this.nblignesmax} sur ${data['count']} on été affichées`)
          }

          if (this.sorties.length == 0) { this.alertService.info('Les paramètres choisis ont exclu toutes les lignes')}
        },
        error: (e) => {
          if (e != 'Not Found') {
            console.error(e)
          }
        }
      })
  }

  getParams(): void {
    this.paramsService.paramssubj$
      .subscribe({
        next: (data: Params) => {
          this.params = data;
          this.jour = this.datePipe.transform(this.params.jour, 'dd/MM/yyyy');
          this.origine = this.params.origine;
        },
        error: (e: string) => {
          if (e != 'Not Found') {
            console.error(e)
          }
        }
      });
  }

}

