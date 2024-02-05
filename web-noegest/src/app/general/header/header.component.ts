import { Component, OnInit, OnDestroy } from '@angular/core';
import { Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Subject, takeUntil, tap } from 'rxjs';

import { AuthenticationService } from 'src/app/general/_services';
import { SeeyouService } from '../_services/seeyou.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit, OnDestroy {
  isNavbarCollapsed = false;

  title = 'matthania';
  namemodule = ""
  username!: string |undefined
  public isLoggedIn = false;
  private destroy$!:Subject<boolean>

  constructor(
    @Inject(PLATFORM_ID) private platformId: object,
    private seeyouService: SeeyouService,
    public authenticationService: AuthenticationService,
  ) {}

  ngOnInit(): void {
    this.destroy$ = new Subject<boolean>;
    this.authenticationService.user$
    .pipe(
      tap(x => {
        this.isLoggedIn = (x.username !== undefined),
        this.username = x.username
      }),
      takeUntil(this.destroy$))
    .subscribe()

    this.seeyouService.rootActive$
    .pipe( takeUntil(this.destroy$))
    .subscribe(
      (value) => (this.namemodule = value)
    );

    /* Permet la fermeture du menu après un choix*/ 
    this.collapseNavbar()
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
  }

  toggleNavbar() { this.isNavbarCollapsed = !this.isNavbarCollapsed;}

  collapseNavbar() {
    this.isNavbarCollapsed = false
    if (isPlatformBrowser(this.platformId)) {
      const navMain = document.getElementById('navbarCollapse');
      if (navMain) {
        navMain.onclick = function onClick() {
          if (navMain) {
            navMain.classList.remove("show");
          }
        }
      }
    }
  }

  home(){
    if (!this.isNavbarCollapsed)
    { this.logout() }
    else
    {
      const navMain = document.getElementById('navbarCollapse');
      if (navMain) {
        navMain.classList.remove("show");
        this.isNavbarCollapsed = false
      }
    }
  }

  onClickQuit() {
    this.seeyouService.emitClickQuit()
  }

  logout() {
    this.isNavbarCollapsed = false
    this.authenticationService.logout();
    this.seeyouService.rootActive$.next('logout')
  }

}

