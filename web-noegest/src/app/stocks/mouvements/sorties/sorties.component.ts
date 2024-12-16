import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject, Subscription, takeUntil } from 'rxjs';
import { MvtsResponse, Mouvement } from '../../_models/mouvement';
import { MvtService } from '../../_services/mvt.service';
import { ParamsService } from '../../_services/params.service'
import { Params } from '../../_models/params';
import { DatePipe } from '@angular/common';
import { Constantes } from 'src/app/constantes';
import { FonctionsPerso } from 'src/app/shared/fonctions-perso';
import { AlertService, SeeyouService } from 'src/app/general/_services';


@Component({
  selector: 'app-sorties',
  templateUrl: './sorties.component.html',
  styleUrls: ['./sorties.component.css']
})


export class SortiesComponent implements OnInit, OnDestroy {
  name = "Sorties";
  private destroy$!: Subject<boolean>
  paramsSubscrib!:Subscription;
  sortiesSubscrib!:Subscription;
  sorties!: Mouvement[];
  selectedMvt!: Mouvement;
  jour: string | null = ""
  urlparams= "";
  params!: Params;
  nblignesmax = 60;

  lstorigine_codes = Constantes.LSTORIGINE_SORTIES.map((x: { code: unknown })=>x.code) ;
  lstservice = Constantes.LSTSERVICE
  ansiToFr = this.fp.dateAnsiToFr

  constructor(
    private paramsService: ParamsService,
    private mvtService: MvtService,
    private datePipe: DatePipe,
    private seeyouService:SeeyouService,
    private alertService: AlertService,
    private fp: FonctionsPerso,
    ) {this.initSubscriptions()}

  initSubscriptions() {
    this.destroy$ = new Subject<boolean>()
    this.seeyouService.initUrlsHisto()
    this.seeyouService.clicksQuit$
      .pipe( takeUntil(this.destroy$))
      .subscribe(() => this.seeyouService.goBack())    
  }

  // appelé par .html
  division = this.fp.quotient

  ngOnInit(): void {
    this.getParams();
    this.getSorties();
  }

  ngOnDestroy(): void {
    this.destroy$.next(true)
    this.paramsSubscrib.unsubscribe()
    this.sortiesSubscrib.unsubscribe()
  }
  mvtsFilter = (mvt: Mouvement) => {
    let ret = true
    // filtre sur la date
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
    const jourFr   = this.datePipe.transform(this.params['jour'], 'dd/MM/yyyy');
    this.urlparams = `/?origine=${this.params.origine}&jour=${jour}`

    this.sortiesSubscrib = this.mvtService.getSorties(this.urlparams)
    .subscribe(
      (data: MvtsResponse) => {
        if (data) {
          const i = data.count
          this.sorties = data.results.filter(this.mvtsFilter)
          const j = this.sorties.length
          if ((j == 0) && (i > 0)) {
            this.alertService.error(`Modifiez les filtres:  ${i} lignes présentes`)
          } else if (j == 0) {
            this.alertService.error(`Aucune ligne connue au ${jourFr}`)
          }
        }
      }
    );
  }

  getParams(): void {
    this.paramsSubscrib = this.paramsService.paramsSubj$
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

}

