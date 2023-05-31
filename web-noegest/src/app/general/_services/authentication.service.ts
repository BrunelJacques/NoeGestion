import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { User } from '../_models';
import { Constantes } from '@app/constantes';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private cst = new Constantes
    private userSubject: BehaviorSubject<User | null>;
    public user: Observable<User | null>;
    private refreshtkn : string


    constructor(
        private router: Router,
        private http: HttpClient
    ) {
        this.userSubject = new BehaviorSubject<User | null>(null);
        this.user = this.userSubject.asObservable();
    }

    public get userValue() {
        return this.userSubject.value;
    }


    login(username: string, password: string) {
        return this.http.post<any>(
            this.cst.TOKEN_URL, 
            { username, password }, 
            { withCredentials: false}
            ).pipe(map(user => {
                user.jwtToken = user.access;
                this.refreshtkn = user.refresh;
                this.userSubject.next(user);
                this.startRefreshTokenTimer();
                return user;
            }));
    }

    refreshToken() {
        console.log(this.refreshToken)
        return this.http.post<any>(
                this.cst.TOKENREFRESH_URL,
                { refresh: this.refreshtkn },
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
        console.log(this.cst.API_URL+'/register',user)
        return this.http.post(this.cst.API_URL+'/register', user);
    };

    // helper methods

    private refreshTokenTimeout?: NodeJS.Timeout;


    private startRefreshTokenTimer() {
        // parse json object from base64 encoded jwt token
        const jwtBase64 = this.userValue!.jwtToken!.split('.')[1];
        const jwtToken = JSON.parse(atob(jwtBase64));

        // set a timeout to refresh the token a minute before it expires
        const expires = new Date(jwtToken.exp * 1000);
        //const timeout = expires.getTime() - Date.now() - (60 * 1000);
        const timeout = expires.getTime() - Date.now() - (60 * 1000) - 220000; //pour test
        this.refreshTokenTimeout = setTimeout(() => this.refreshToken().subscribe(), timeout);
    }

    private stopRefreshTokenTimer() {
        clearTimeout(this.refreshTokenTimeout);
    }

}
