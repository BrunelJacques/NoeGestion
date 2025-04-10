import { Component } from '@angular/core';
import { SeeyouService } from 'src/app/general/_services';
import { User } from '../../_models';
import { AuthenticationService } from 'src/app/general/_services';
@Component({
    selector: 'app-subheader-register',
    templateUrl: './subheader-register.component.html',
    standalone: false
})

export class SubheaderRegisterComponent {
  parentName = "-"
  nomModule = "-"
  isBtnQuit = true
  libBtnOk = "Ok"
  template = "."
  valid = true
  user!: User

  constructor(
    private seeyouService: SeeyouService,
    private authenticationService: AuthenticationService
  ){
    this.seeyouService.templateActive$.subscribe(
      (template) => { 
        this.template = template
        this.parentName = this.seeyouService.getParentName()
      }
    )

    this.user = this.authenticationService.userValue;
  }

  onClickQuit() {
    this.seeyouService.emitClickQuit()
  }

}