import { Component } from '@angular/core';
import { SharedService } from 'src/app/general/_services';
import { ParamsService } from '../../_services/params.service';
import { Router } from '@angular/router';
import { Constantes } from 'src/app/constantes'
import { DatePipe } from '@angular/common'
import { Params } from '../../_models/params';

@Component({
  selector: 'app-subheader-mvts',
  templateUrl: './subheader-mvts.component.html',
})

export class SubheaderMvtsComponent {

  isToAjout = false
  isToParams = false
  isToGoBack = false
  toAjouts = ['sorties','entrees']
  toParams = ['sorties','entrees','onesortie','oneentree']
  toGoBacks = ['onesortie','oneentree','params']
  template = "."
  params!:Params
  jour: string | null = ""
  lstservice = Constantes.LSTSERVICE


  constructor(
    private sharedService: SharedService,
    private router: Router,
    private paramsService: ParamsService,
    private datePipe: DatePipe,
  ){
    this.sharedService.templateActive$.subscribe(
      (template) => { 
        this.template = template
        this.isToAjout = (this.toAjouts.indexOf(template) != -1)
        this.isToParams = (this.toParams.indexOf(template) != -1)
        this.isToGoBack = (this.toGoBacks.indexOf(template) != -1 )
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
  onSeeYou(): void {
    console.log('SeeYou: ',this.template)
    this.sharedService.setUrlParent()
  }

  onParams(): void {
    this.onSeeYou()
    this.router.navigate(['/stocks/params'])
  }

  onSubmit(): void {
    this.sharedService.onSubmitEvent.emit(' Click submit from subheaderMvts');
  }

  onGoBack() {
    this.sharedService.onGoBackEvent.emit(' Click toGoBack from subheaderMvts');
  }

}