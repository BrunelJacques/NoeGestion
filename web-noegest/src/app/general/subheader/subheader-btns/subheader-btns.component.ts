import { Component } from '@angular/core';
import { SeeyouService } from '../../_services';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../../shared/shared.modules';


@Component({
  selector: 'app-subheader-btns',
  templateUrl: './subheader-btns.component.html',
  standalone: true,
  imports: [ CommonModule, SharedModule ]
})

export class SubheaderBtnsComponent {
  parentName = "-"
  nomModule = "-"
  isBtnQuit = true
  isBtnOk = true
  libBtnOk = "Ok"
  template = "."
  valid = true

  private seeyouService: SeeyouService; // Explicitly declare the property

  constructor(seeyouService: SeeyouService) {
    this.seeyouService = seeyouService; // Assign it in the constructor

    this.seeyouService.templateActive$.subscribe((template) => {
      this.template = template;
      this.parentName = this.seeyouService.getParentName();
    });

    this.seeyouService.isBtnOk$.subscribe((x) => {
      this.isBtnOk = x;
    });
  }

  onClickOk() {
    this.seeyouService.emitClickOk()
  }

  onClickQuit() {
    this.seeyouService.emitClickQuit()
  }

}
