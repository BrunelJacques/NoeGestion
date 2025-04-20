import { Component } from '@angular/core';
import { SeeyouService } from '../../../general/_services';
import { ParamsService } from '../../_services/params.service';
import { Constantes } from '../../../constantes';
import { CommonModule, DatePipe } from '@angular/common';
import { Params } from '../../_models/params';
import { Subject, takeUntil } from 'rxjs';
import { SharedModule } from '../../../shared/shared.modules';


@Component({
  selector: 'app-subheader-mvts',
  templateUrl: './subheader-mvts.component.html',
  standalone: true,
  imports: [ CommonModule, SharedModule ]
})

export class SubheaderMvtsComponent {
  private datePipe = new DatePipe('fr-FR');
  private destroy$!: Subject<boolean>;
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
  lstModules: Record<string, string> = {
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
    this.destroy$ = new Subject<boolean>()
    this.paramsService.paramsSubj$
      .pipe( takeUntil(this.destroy$) )
      .subscribe({
        next: (data:Params) => {
          this.params = data;
          this.jour = this.datePipe.transform(this.params['jour'], 'dd/MM/yyyy');
        }
      })
  }


  onClickOk() {
    this.seeyouService.emitClickOk()
  }

  onClickQuit() {
    this.seeyouService.emitClickQuit()
  }



}
