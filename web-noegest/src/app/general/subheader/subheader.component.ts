import { Component, OnDestroy, OnInit } from '@angular/core';
import { SeeyouService } from '../_services';

@Component({
  selector: 'app-subheader',
  templateUrl: './subheader.component.html',
  styleUrls: ['./subheader.component.scss']
})

export class SubheaderComponent implements OnInit, OnDestroy {

  bgcolor = 'fond-sombre'
  lstUrls = ['stocks','kms']
  lstMvt = ['params','sorties','onesortie']
  isSpecial = false
  mvt = false
  register = false

  constructor(
    private seeyouService: SeeyouService,
    ){}

  ngOnInit(): void {
    this.seeyouService.templateActive$.subscribe(
      (template) => { 
        this.mvt = (this.lstMvt.indexOf(template)!= -1 ),
        this.register = (template === 'register')
      })
    this.seeyouService.rootActive$.subscribe(
      (rootUrl) => { 
        this.updateCurrentURL(rootUrl)
      })
  }

  ngOnDestroy(): void {
    this.seeyouService.templateActive$.unsubscribe()
    this.seeyouService.rootActive$.unsubscribe()
  }

  private updateCurrentURL(rootUrl:string) {
    const ix = this.lstUrls.indexOf(rootUrl)
    if (ix !== -1){
      this.isSpecial = true;
      this.bgcolor = 'fond-ecran'
    } 
    else { 
      this.mvt = false
      this.isSpecial = false
      this.bgcolor = 'fond-sombre'
    }
  }
}