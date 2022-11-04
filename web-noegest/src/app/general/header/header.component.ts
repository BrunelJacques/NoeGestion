import { Component, OnInit } from '@angular/core';
import { Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Subscription } from 'rxjs';

import { User } from '@app/general/_models';
import { AccountService } from '@app/general/_services';
import { ChoixAppliService } from '../_services/choix-appli.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit {
  title = 'matthania';
  user = new User();
  choixSub = new Subscription();
  choixAppli: string = 'header';

  constructor(
    @Inject(PLATFORM_ID) private platformId: object,
    private choixAppliService: ChoixAppliService,
    private accountService: AccountService,
    ) {
      this.accountService.user.subscribe(x => this.user = x);
    };

  ngOnInit(): void {
    this.choixSub = this.choixAppliService.choixSubject$.subscribe(
      (value) => (this.choixAppli = value)
    );
    if (isPlatformBrowser(this.platformId)) {
      const navMain = document.getElementById('navbarNav');
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
    this.choixSub.unsubscribe();
  }

  logout() {
    this.accountService.logout();
    this.choixAppliService.choixSubject$.next('logout')
  }

  
}

