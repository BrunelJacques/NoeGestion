import { Component } from '@angular/core';
import { SeeyouService } from 'src/app/general/_services';
import { ParamsService } from '../../_services/params.service';
import { Constantes } from 'src/app/constantes'
import { DatePipe } from '@angular/common'
import { Params } from '../../_models/params';

@Component({
  selector: 'app-subheader-mvts',
  templateUrl: './subheader-mvts.component.html',
})

export class SubheaderMvtsComponent {
  parentName = "-"
  nomModule = "-"
  isListe = false
  isToParams = false
  isToQuit = false
  listes = ['sorties','entrees']
  toParams = ['sorties','entrees','onesortie','oneentree']
  toQuits = ['onesortie','oneentree','params']
  template = "."
  params!:Params
  jour: string | null = ""
  lstservice = Constantes.LSTSERVICE
  lstModules: { [key: string]: string } = {
    'sorties': 'Sorties',
    'entrees': 'Entrées',
    'params': 'Filtres',
    'onesortie': 'Une Sortie',
    'oneentree': 'Une Entrée',
  };
  valid = true

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
        this.isToQuit = (this.toQuits.indexOf(template) != -1 )
        this.parentName = this.seeyouService.getParentName()
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


  onClickOk() {
    console.log('subheader clickOk')
    this.seeyouService.emitClickOk()
  }

  onClickQuit() {
    this.seeyouService.emitClickQuit()
  }



}