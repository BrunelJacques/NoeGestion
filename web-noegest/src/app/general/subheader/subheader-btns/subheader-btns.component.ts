import { Component } from '@angular/core';
import { SeeyouService } from 'src/app/general/_services';


@Component({
  selector: 'app-subheader-btns',
  templateUrl: './subheader-btns.component.html',
})

export class SubheaderBtnsComponent {
  parentName = "-"
  nomModule = "-"
  isToQuit = true
  template = "."
  valid = true

  constructor(
    private seeyouService: SeeyouService,
  ){
    this.seeyouService.templateActive$.subscribe(
      (template) => { 
        this.template = template
        this.parentName = this.seeyouService.getParentName()
      }
    )  
  }

  onClickOk() {
    this.seeyouService.emitClickOk()
  }

  onClickQuit() {
    this.seeyouService.emitClickQuit()
  }

}