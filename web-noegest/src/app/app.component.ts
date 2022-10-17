import { Component } from '@angular/core';
import { AccountService } from './general/_services';
import { User } from './general/_models';

@Component({ selector: 'app', templateUrl: 'app.component.html'})
export class AppComponent {
    user: User;
  title: any;

    constructor(private accountService: AccountService) {
        this.accountService.user.subscribe(x => this.user = x);
    }

    logout() {
        this.accountService.logout();
    }
}