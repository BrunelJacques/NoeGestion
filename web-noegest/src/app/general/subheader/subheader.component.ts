import { Component, OnInit } from '@angular/core';
import { NameModuleService } from '../_services';

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
    private nameModuleService: NameModuleService,
    ){}

  ngOnInit(): void {
    this.nameModuleService.rootUrl$.subscribe(
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