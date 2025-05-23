﻿/* ligne ci dessous pour reconaître les types NodeJS.Timeout */
/// <reference types="node" />

import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../_models';
import { Constantes } from '../../constantes';

@Injectable({ providedIn: 'root' })

export class AuthenticationService {
    private cst = new Constantes;
    public userSubject: BehaviorSubject<User>;
    public user$: Observable<User>;

    constructor(
        private router: Router,
        private http: HttpClient,
    ) {
        this.userSubject = new BehaviorSubject<User>(new User);
        this.user$ = this.userSubject.asObservable();
    }

    // appelé par auth guard
    public get userValue():User {
        return this.userSubject.value;
    }


    login(username: string, password: string) {
        return this.http.post<User>(
            this.cst.TOKEN_URL,
            { username, password },
            { withCredentials: false}
            ).pipe(map(user => {
                user.jwtToken = user.access;
                this.userSubject.next(user);
                this.startRefreshTokenTimer();
                return user;
            }));
    }

    logout() {
        //pas de revoke token avec Django RestFramework
        this.stopRefreshTokenTimer();
        this.userSubject.next(new User);
        this.router.navigate(['/login']);
    }

    register(user: User) {
        const path = `/admin/auth/user/`+ user.id + `/change/`;
        return this.http.post(this.cst.API_URL + path, user );
    }

    refreshToken() {
        // le post sera intercepté et complété par JwtInterceptor
        return this.http.post<User>(
                this.cst.TOKENREFRESH_URL,
                {},
                { withCredentials: false }
                )
            .pipe(map(user => {
                user.jwtToken = user.access;
                this.userSubject.next(user);
                this.startRefreshTokenTimer();
                return user;
            }));
    }

    // helper methods
    private refreshTokenTimeout?: string | number | NodeJS.Timeout | undefined;
    
    private startRefreshTokenTimer() {
        // parse json object from base64 encoded jwt token

        if (this.userValue.jwtToken) {
            const jwtBase64 = this.userValue!.jwtToken!.split('.')[1];
            const jwtToken = JSON.parse(window.atob(jwtBase64));

            // set a timeout to refresh the token a minute before it expires
            const expires = new Date(jwtToken.exp * 1000);
            const timeout = expires.getTime() - Date.now() - (60 * 1000);
            //const timeout = expires.getTime() - Date.now() - (120 * 1000) ; //pour test plus rapides
            this.refreshTokenTimeout = setTimeout(() => this.refreshToken().subscribe(), timeout);
            }
    }

    private stopRefreshTokenTimer() {
        clearTimeout(this.refreshTokenTimeout);
    }
}
