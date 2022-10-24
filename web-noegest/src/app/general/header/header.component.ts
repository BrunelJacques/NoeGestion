import { Component, OnInit } from '@angular/core';
import { Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Subscription } from 'rxjs';

import { AccountService } from '@app/general/_services';
import { User } from '@app/general/_models';
import { LoginStateService } from '@app/general/_services';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit {
  title = 'matthania';
  user = new User();
  choixAppli = localStorage.getItem('choixAppli')
  loginSub = new Subscription();
  isLoggedIn = false


  constructor(
    @Inject(PLATFORM_ID) private platformId: object,
    private accountService: AccountService,
    private loginState: LoginStateService
    ) {
      this.accountService.user.subscribe(x => this.user = x);
      console.log(this.choixAppli);

    };


  ngOnInit(): void {
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
    this.loginSub = this.loginState.subject.subscribe(
      (value) => (this.isLoggedIn = value)
    );
  }

  ngOnDestroy(): void {
    this.loginSub.unsubscribe();
  }
  
  logout() {
    this.accountService.logout();
  }

  
}

