import { Component } from '@angular/core';
import { UrlService } from 'src/app/general/_services';

@Component({
  selector: 'app-subheader-mvts',
  templateUrl: './subheader-mvts.component.html',
  styleUrls: ['./subheader-mvts.component.scss']
})

export class SubheaderMvtsComponent {

  templateUrl = ""
  parent = ""

  constructor(
    private urlService: UrlService,
  ){
    this.urlService.templateUrl$.subscribe(
      (templateUrl) => { 
        this.templateUrl = templateUrl
      })
    this.urlService.parentNameSubj$.subscribe(
        (value) => {this.parent = value})
  }
}
