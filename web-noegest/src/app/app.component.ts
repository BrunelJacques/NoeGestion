import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from './general/_services';
import { User } from './general/_models';
import { Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'noegestion';
  user!: User;

  constructor(
    private modalService: NgbModal,
    @Inject(PLATFORM_ID) private platformId: object,
    private authenticationService: AuthenticationService) {
      this.authenticationService.user.subscribe(x => this.user = x);
    }

  public open(modal: unknown): void {
    this.modalService.open(modal);
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
