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
  isSpecial = false

  constructor(
    private urlService: UrlService,
    ){}

  ngOnInit(): void {
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
      this.isSpecial = false
      this.bgcolor = 'fond-sombre'
    }
  }
}