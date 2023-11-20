import { Component } from '@angular/core';


import { environment } from 'src/environments/environment';
import { AuthenticationService } from '../_services';
import { SeeyouService} from '../_services/seeyou.service';


import { User } from 'src/app/general/_models';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})


export class HomeComponent  {

  user = new User();
  appName = environment.appName

  constructor(
    private authenticationService: AuthenticationService,
    private seeyouService: SeeyouService,
    )
     {
      this.authenticationService.user$.subscribe(x => this.user = x);
     }



  emitLocation(name: string){
    this.seeyouService.rootActive$.next(name)
  }

  stocks() {
    this.emitLocation('stocks')
  }

  kms() {
    this.emitLocation('kms')
  }

}


