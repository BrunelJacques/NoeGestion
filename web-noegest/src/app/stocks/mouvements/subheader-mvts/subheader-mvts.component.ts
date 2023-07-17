import { Component } from '@angular/core';
import { UrlService } from 'src/app/general/_services';
import { ParamsService } from '../../_services/params.service';
import { Params } from '@angular/router';
import { Constantes } from 'src/app/constantes'
import { DatePipe } from '@angular/common'

@Component({
  selector: 'app-subheader-mvts',
  templateUrl: './subheader-mvts.component.html',
  styleUrls: ['./subheader-mvts.component.scss']
})

export class SubheaderMvtsComponent {
  templateUrl = ""
  parent = ""
  params!:Params
  jour: string | null = ""
  lstservice = Constantes.LSTSERVICE

  constructor(
    private urlService: UrlService,
    private paramsService: ParamsService,
    private datePipe: DatePipe,
  ){

    this.urlService.templateUrl$.subscribe(
      (templateUrl) => { 
        this.templateUrl = templateUrl
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

}
