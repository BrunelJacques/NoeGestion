import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Mouvement } from '../../_models/mouvement';
import { MvtService } from '../../_services/mvt.service';
import { ParamsService } from '../../_services/params.service'
import { Params } from '../../_models/params';
import { DatePipe } from '@angular/common';
import { Constantes } from 'src/app/constantes';
import { DateAnsiToFr } from 'src/app/general/_helpers/fonctions-perso'
import { SharedService } from 'src/app/general/_services';
import { Produit } from 'src/app/general/_helpers/fonctions-perso';

@Component({
  selector: 'app-sorties',
  templateUrl: './sorties.component.html',
  styleUrls: ['./sorties.component.css']
})


export class SortiesComponent implements OnInit, OnDestroy {
  name = "Sorties";
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
  ansiToFr = DateAnsiToFr

  constructor(
    private paramsService: ParamsService,
    private mvtService: MvtService,
    private datePipe: DatePipe,
    private sharedService:SharedService,
    ) {}

  produit = Produit

  ngOnInit(): void {
    this.getParams();
    this.getSorties();
    this.params.parent = this.name
    this.onSeeYou()
    console.log('seeYou init liste')
    this.sharedService.setModeLancement('liste')
  }

  ngOnDestroy(): void {
    this.paramsSubscrib.unsubscribe
    this.sortiesSubscrib.unsubscribe
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

    this.sortiesSubscrib = this.mvtService.getSorties(this.urlparams)
      .subscribe( 
        data => this.sorties = data['results'].filter(this.mvtsFilter)
      )
  }

  getParams(): void {
    this.paramsSubscrib = this.paramsService.paramssubj$
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

  onSeeYou(): void {
    console.log('seeYou sorties modif')
    this.sharedService.setUrlParent()
    this.sharedService.setModeLancement('modif')
  }
}

