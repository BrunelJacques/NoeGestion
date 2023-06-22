import { Component, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Subscription } from 'rxjs';

import { User } from 'src/app/general/_models';
import { AuthenticationService } from 'src/app/general/_services';
import { NameappliService } from '../_services/namemodule.service';
import { NgbCollapse } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit, OnDestroy {
  @ViewChild('navbarCollapse') navbarCollapse: NgbCollapse;
  isNavbarCollapsed = false;

  toggleNavbar() { this.isNavbarCollapsed = !this.isNavbarCollapsed;}

  collapseNavbar() {
    this.isNavbarCollapsed = false}

  title = 'matthania';
  user = new User();
  choixSub = new Subscription();
  choixAppli = 'header';
  loginSub = new Subscription();
  isLoggedIn = false;


  constructor(
    @Inject(PLATFORM_ID) private platformId: object,
    private choixAppliService: NameappliService,
    private authenticationService: AuthenticationService,
    ) {}

  ngOnInit(): void {
    this.loginSub = this.authenticationService.loginSubject.subscribe(
      (value) => (this.isLoggedIn = value)
    );
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
    this.loginSub.unsubscribe();
  }

  home(){
    if (!this.isNavbarCollapsed)
    { this.logout() }
    { this.collapseNavbar() }
  }

  logout() {
    this.collapseNavbar()
    this.authenticationService.logout();
    this.choixAppliService.choixSubject$.next('logout')
  }


}

