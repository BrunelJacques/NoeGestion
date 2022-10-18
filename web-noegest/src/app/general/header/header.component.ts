import { Component, OnInit } from '@angular/core';
import { Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

import { AccountService } from '@app/general/_services';
import { User } from '@app/general/_models';
//jb import { ChoixAppli } from '@app/general/_services';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit {
  title = 'matthania';
  user = new User();
  //jb choixAppli = new ChoixAppli();

  constructor(
    @Inject(PLATFORM_ID) private platformId: object,
    private accountService: AccountService) {
      this.accountService.user.subscribe(x => this.user = x);
      //jb this.accountService.choixAppli.subscribe(x => this.choixAppli = x);

      //jb console.log(this.choixAppli)
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
    this.accountService.logout();
  }
}

