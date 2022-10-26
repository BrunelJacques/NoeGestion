import { Component, OnInit } from '@angular/core';
import { Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { environment } from 'src/environments/environment';
import { AccountService } from '../_services';
import { User } from '@app/general/_models';
import { LoginStateService } from '../_services/login-state.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  user = new User();

  constructor(
    @Inject(PLATFORM_ID)
    private platformId: object,
    private accountService: AccountService,
    private loginState: LoginStateService,
    )
     {
      this.accountService.user.subscribe(x => this.user = x);
      this.loginState.choixSubject$.subscribe((x => console.log('home constructor subcribe choixSubject: '+x)))
     }
     ;
    
  ngOnInit(): void {
    this.loadScript('assets/params/js/index.js');
    this.loginState.choixSubject$.subscribe(
      (value) => (console.log('home ngONInit subscribe: ' + value))
    );
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

  emitSubject(val: string){
    this.loginState.choixSubject$.next(val)
  };

  stocks() {
    this.emitSubject('stocks')

  }

  kms() {
    this.emitSubject('kms')
  }

}
