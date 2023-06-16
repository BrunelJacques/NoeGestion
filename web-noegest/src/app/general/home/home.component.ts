import { Component, OnInit } from '@angular/core';


import { Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { environment } from 'src/environments/environment';
import { AuthenticationService } from '../_services';
import { NameappliService, NamemoduleService } from '../_services/namemodule.service';


import { User } from 'src/app/general/_models';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})


export class HomeComponent implements OnInit {

  user = new User();
  appName = environment.appName

  constructor(
    @Inject(PLATFORM_ID)
    private platformId: object,
    private authenticationService: AuthenticationService,
    private choixAppliService: NameappliService,
    private namemoduleService: NamemoduleService,
    )
     {
      this.authenticationService.user.subscribe(x => this.user = x);
     }
     ;
    
  ngOnInit(): void {
    this.loadScript('assets/params/js/index.js');
  }

  loadScript(name: string): void {
    if (isPlatformBrowser(this.platformId)) {
      const s = document.createElement('script');
      s.type = 'text/javascript';
      s.src = name;
      s.async = false;
      document.getElementsByTagName('head')[0].appendChild(s);
    }
  }
 

  emitLocation(name: string){
    this.choixAppliService.choixSubject$.next(name)
    this.namemoduleService.setParentName(name)

  };

  stocks() {
    this.emitLocation('stocks')

  }

  kms() {
    this.emitLocation('kms')
  }

} 


