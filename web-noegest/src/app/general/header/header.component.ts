import { Component, OnInit } from '@angular/core';
import { Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Subscription } from 'rxjs';

import { User } from '@app/general/_models';
import { AccountService } from '@app/general/_services';
import { LoginStateService } from '../_services/login-state.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit {
  title = 'matthania';
  user = new User();
  loginSub = new Subscription();
  choixAppli: boolean = false;

  constructor(
    @Inject(PLATFORM_ID) private platformId: object,
    private loginState: LoginStateService,
    private accountService: AccountService,
    ) {
      this.accountService.user.subscribe(x => this.user = x);
    };

  ngOnInit(): void {
    this.loginSub = this.loginState.choixSubject$.subscribe(
      (value) => (this.choixAppli = value)
    );
    if (isPlatformBrowser(this.platformId)) {
      const navMain = document.getElementById('navbarCollapse');
      if (navMain) {
        navMain.onclick = function onClick() {
          if (navMain) {
            navMain.classList.remove("show");
          }
        }
      }
    };

  }

  ngOnDestroy(): void {
    this.loginSub.unsubscribe();
  }

  logout() {
    this.accountService.logout();
    this.loginState.choixSubject$.next(false)
  }

  
}

