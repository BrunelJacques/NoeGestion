﻿import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from '@app/general/_services';

@Component({ templateUrl: 'layout.component.html' })
export class LayoutComponent {
    constructor( 
        private router: Router,
        private accountService:  AccountService
     ) {
        // redirect to home if not logged
        if (!this.accountService.userValue) {
            this.router.navigate(['/']);
        }
     }
}