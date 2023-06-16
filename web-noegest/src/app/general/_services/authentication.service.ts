/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { DatePipe } from '@angular/common';

import { User } from '../_models';
import { Constantes } from 'src/app/constantes';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private cst = new Constantes
    private userSubject: BehaviorSubject<User>;
    public user: Observable<User>;
    datePipe = new DatePipe('en-US');

    constructor(
        private router: Router,
        private http: HttpClient,
    ) {
        this.userSubject = new BehaviorSubject<User>(null);
        this.user = this.userSubject.asObservable();
    }

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

    refreshToken() {
        //console.log('go refresh: ',this.datePipe.transform(Date.now(),'yyyy-MM-dd hh-mm-ss'))
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

    
    logout() {
        this.http.post<any>(this.cst.API_URL+'/logout/', {}, { withCredentials: true }).subscribe();
        this.stopRefreshTokenTimer();
        this.userSubject.next(null);
        this.router.navigate(['/login']);
    }


    register(user: User) {
        console.log(this.cst.API_URL+'/register',user);
        return this.http.post(this.cst.API_URL+'/register', user);
    }

    // helper methods

    private refreshTokenTimeout?: NodeJS.Timeout;


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
