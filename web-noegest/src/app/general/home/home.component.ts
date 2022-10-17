import { Component, OnInit } from '@angular/core';
import { Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { environment } from 'src/environments/environment';
import { AccountService } from '../_services';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})

export class HomeComponent implements OnInit {
  choixAppli: string;


  constructor(
    @Inject(PLATFORM_ID)
    private platformId: object,
    private accountService: AccountService
  ) { }

  ngOnInit(): void {
    this.loadScript('assets/params/js/index.js');
    this.choixAppli = this.accountService.getChoix()
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
  appName = environment.appName

  stocks() {
    this.accountService.setChoix('stocks');
  }

  kms() {
    this.accountService.setChoix('kms');
  }

}
