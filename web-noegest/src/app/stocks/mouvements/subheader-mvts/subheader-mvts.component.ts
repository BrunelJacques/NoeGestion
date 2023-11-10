import { Component } from '@angular/core';
import { SeeyouService } from 'src/app/shared/_services';
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
    'params': 'Filtres',
    'onesortie': 'Une Sortie',
    'oneentree': 'Une Entrée',
  };

  constructor(
    private seeyouService: SeeyouService,
    private paramsService: ParamsService,
    private datePipe: DatePipe,
  ){
    this.seeyouService.templateActive$.subscribe(
      (template) => { 
        this.template = template
        this.isListe = (this.listes.indexOf(template) != -1)
        this.isToParams = (this.toParams.indexOf(template) != -1)
        this.isToGoBack = (this.toGoBacks.indexOf(template) != -1 )
        this.modeLancement = this.seeyouService.modeLancement
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
    this.seeyouService.setUrlParent()
    this.seeyouService.setModeLancement(modeLancement)
  }

  onSubmit(): void {
    this.seeyouService.onSubmitEvent.emit(' Click submit from subheaderMvts');
  }

  onGoBack() {
    this.seeyouService.onGoBackEvent.emit(' Click toGoBack from subheaderMvts');
  }

}