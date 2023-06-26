import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from './general/_services';
import { User } from './general/_models';
import { Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})

export class AppComponent implements OnInit{
  user!: User;
  title = 'Matthania-Noegestion';
  footerUrl = 'https://www.matthania.com/';

  constructor(
    @Inject(PLATFORM_ID) private platformId: object,
    private authenticationService: AuthenticationService
    ){
      this.authenticationService.user.subscribe(x => this.user = x);
  }
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
    }
  } 

  logout() {
      this.authenticationService.logout();
  }
}