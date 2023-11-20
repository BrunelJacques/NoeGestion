import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from 'src/app/general/_services';

@Component({ templateUrl: 'layout.component.html' })
export class LayoutComponent {
    constructor(
        private router: Router,
        private authenticationService: AuthenticationService
    ) {
        // redirect to home if already logged in
        const user = this.authenticationService.userValue
        if (user) {
            console.log('vu par layout user:',user.username);
        }
    }
}