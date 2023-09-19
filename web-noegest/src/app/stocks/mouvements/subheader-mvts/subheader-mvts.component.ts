import { Component } from '@angular/core';
import { SharedService } from 'src/app/general/_services';
import { ParamsService } from '../../_services/params.service';
import { Constantes } from 'src/app/constantes'
import { DatePipe } from '@angular/common'
import { Params } from '../../_models/params';

@Component({
  selector: 'app-subheader-mvts',
  templateUrl: './subheader-mvts.component.html',
})

export class SubheaderMvtsComponent {

  isListe = false
  isToParams = false
  isToGoBack = false
  listes = ['sorties','entrees']
  toParams = ['sorties','entrees','onesortie','oneentree']
  toGoBacks = ['onesortie','oneentree','params']
  template = "."
  params!:Params
  jour: string | null = ""
  lstservice = Constantes.LSTSERVICE
  nomModule = "-"
  modeLancement = ""
  lstModules: { [key: string]: string } = {
    'sorties': 'Sorties',
    'entrees': 'Entrées',
    'params': 'Paramètres',
    'onesortie': 'Une Sortie',
    'oneentree': 'Une Entrée',
  };

  constructor(
    private sharedService: SharedService,
    private paramsService: ParamsService,
    private datePipe: DatePipe,
  ){
    this.sharedService.templateActive$.subscribe(
      (template) => { 
        this.template = template
        this.isListe = (this.listes.indexOf(template) != -1)
        this.isToParams = (this.toParams.indexOf(template) != -1)
        this.isToGoBack = (this.toGoBacks.indexOf(template) != -1 )
        this.modeLancement = this.sharedService.modeLancement
      }
    )
  
    this.getParams()
  }

  
  getParams(): void {
    this.paramsService.paramssubj$
      .subscribe({
        next: (data:Params) => { 
          this.params = data; 
          this.jour = this.datePipe.transform(this.params['jour'], 'dd/MM/yyyy');
        }
      })
  }

  // stocke l'url actuelle pour un prochain retour par onGoBack
  onSeeYou(modeLancement:string): void {
    this.sharedService.setUrlParent()
    this.sharedService.setModeLancement(modeLancement)
  }

  onSubmit(): void {
    this.sharedService.onSubmitEvent.emit(' Click submit from subheaderMvts');
  }

  onGoBack() {
    this.sharedService.onGoBackEvent.emit(' Click toGoBack from subheaderMvts');
  }

}