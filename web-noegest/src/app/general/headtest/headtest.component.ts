import { Component, OnInit } from '@angular/core';
import { Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Subscription } from 'rxjs';

import { User } from 'src/app/general/_models';
import { AuthenticationService } from 'src/app/general/_services';
import { NameappliService } from '../_services/namemodule.service';

@Component({
  selector: 'app-headtest',
  templateUrl: './headtest.component.html',
  styleUrls: ['./headtest.component.less']
})
export class HeadtestComponent implements OnInit {
  title = 'matthania';
  user = new User();
  choixSub = new Subscription();
  choixAppli: string = 'header';

  constructor(
    @Inject(PLATFORM_ID) private platformId: object,
    private choixAppliService: NameappliService,
    private authenticationService: AuthenticationService,
    ) {};

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
    this.authenticationService.logout();
    this.choixAppliService.choixSubject$.next('logout')
  }

  
}

