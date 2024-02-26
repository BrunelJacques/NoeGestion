import { Component } from '@angular/core';
import { SeeyouService } from 'src/app/general/_services';


@Component({
  selector: 'app-subheader-btns',
  templateUrl: './subheader-btns.component.html',
})

export class SubheaderBtnsComponent {
  parentName = "-"
  nomModule = "-"
  isBtnQuit = true
  isBtnOk = true
  libBtnOk = "Ok"
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
    this.seeyouService.isBtnOk$.subscribe(
      (x) => {this.isBtnOk = x}
    )
  }

  onClickOk() {
    this.seeyouService.emitClickOk()
  }

  onClickQuit() {
    this.seeyouService.emitClickQuit()
  }

}