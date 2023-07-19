import { Component, OnInit } from '@angular/core';
import { UrlService } from '../_services';

@Component({
  selector: 'app-subheader',
  templateUrl: './subheader.component.html',
  styleUrls: ['./subheader.component.scss']
})

export class SubheaderComponent implements OnInit {
  bgcolor = "fond-sombre";
  lstUrls = ['stocks','kms']
  lstMvt = ['params','sorties','onesortie']
  isSpecial = false
  mvt = false

  constructor(
    private urlService: UrlService,
    ){}

  ngOnInit(): void {
    this.urlService.templateUrl$.subscribe(
      (template) => { 
        this.mvt = (this.lstMvt.indexOf(template)!= -1 )
      })
    this.urlService.rootUrl$.subscribe(
      (rootUrl) => { 
        this.updateCurrentURL(rootUrl)
      })
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