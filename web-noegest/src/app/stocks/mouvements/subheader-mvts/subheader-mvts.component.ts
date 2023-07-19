import { Component, EventEmitter, Output } from '@angular/core';
import { UrlService } from 'src/app/general/_services';
import { ParamsService } from '../../_services/params.service';
import { Params } from '@angular/router';
import { Constantes } from 'src/app/constantes'
import { DatePipe } from '@angular/common'
import { OneSortieComponent } from '../one-sortie/one-sortie.component';
import { ParamsComponent } from '../../params/params.component';

@Component({
  selector: 'app-subheader-mvts',
  templateUrl: './subheader-mvts.component.html',
  styleUrls: ['./subheader-mvts.component.scss']
})

export class SubheaderMvtsComponent {
  @Output() eventEmitter = new EventEmitter<void>;

  emitEvent(): void {
    this.eventEmitter.emit();
  }
  isAjout = false
  isGoBack = false
  ajouts = ['sorties','entrees']
  goBacks = ['onesortie','params','oneentree']
  template = "."
  parent = ""
  params!:Params
  jour: string | null = ""
  lstservice = Constantes.LSTSERVICE


  constructor(
    private urlService: UrlService,
    private paramsService: ParamsService,
    private datePipe: DatePipe,
    private oneSortieComponent: OneSortieComponent,
    private paramsComponent: ParamsComponent,
  ){
    this.urlService.templateUrl$.subscribe(
      (template) => { 
        this.isAjout = (this.ajouts.indexOf(template) != -1)
        this.template = template
        this.isGoBack = (this.goBacks.indexOf(template) != -1 )
      }
    )
    this.urlService.parentNameSubj$.subscribe(
        (value) => {this.parent = value}
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

  getParentComponent(){
    switch (this.template){
      case 'onesortie':
        return this.oneSortieComponent
      case 'params':
        return this.paramsComponent
    }
    return this
  }

  onSubmit() {
    if (this.componentA && this.componentA.onSubmit) {
      // Call the 'onSubmit' function of ComponentA with the 'this' context of ComponentA
      this.componentA.onSubmit();
    }
  } 

  goBack() {
    console.log('parent.goBack non géré')
  }

}