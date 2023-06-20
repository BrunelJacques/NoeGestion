import { Component, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Subscription } from 'rxjs';
 
import { User } from 'src/app/general/_models';
import { AuthenticationService } from 'src/app/general/_services';
import { NameappliService } from '../_services/namemodule.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit, OnDestroy {
  title = 'matthania';
  user = new User();
  choixSub = new Subscription();
  choixAppli = 'header';

  constructor(
    @Inject(PLATFORM_ID) private platformId: object,
    private choixAppliService: NameappliService,
    private authenticationService: AuthenticationService,
    ) {}

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
    }
  }

  ngOnDestroy(): void {
    this.choixSub.unsubscribe();
  }

  logout() {
    this.authenticationService.logout();
    this.choixAppliService.choixSubject$.next('logout')
  }


}

