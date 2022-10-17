import { Component, OnInit } from '@angular/core';
import { Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

import { AccountService } from '@app/general/_services';
import { User } from '@app/general/_models'; 

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit {
  title = 'matthania';
  user = new User()

  constructor(
    @Inject(PLATFORM_ID) private platformId: object,
    private accountService: AccountService) {
      this.accountService.user.subscribe(x => this.user = x);
  }

  ngOnInit(): void {
    console.log(this.user)

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

