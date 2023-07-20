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
  styleUrls: ['./subheader-mvts.component.scss']
})

export class SubheaderMvtsComponent {

  isAjout = false
  isGoBack = false
  ajouts = ['sorties','entrees']
  goBacks = ['onesortie','params','oneentree']
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
        this.isAjout = (this.ajouts.indexOf(template) != -1)
        this.template = template
        this.isGoBack = (this.goBacks.indexOf(template) != -1 )
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

  onSeeYou(): void {
    console.log('seeyou subheader')
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
    this.sharedService.onGoBackEvent.emit(' Click goBack from subheaderMvts');
  }

}