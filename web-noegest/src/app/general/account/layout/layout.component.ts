import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from 'src/app/general/_services';

@Component({ templateUrl: 'layout.component.html' })
export class LayoutComponent {
    constructor(
        private router: Router,
        private authenticationService: AuthenticationService
    ) {
        const user = this.authenticationService.userValue
        // redirect to home if already logged in
        console.log('user layout:',user)
    }
}