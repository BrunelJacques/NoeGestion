import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '@environments/environment';
import { User } from '@app/general/_models';

import { LoggedInUser } from '../_models/user';

@Injectable({
  providedIn: 'root'
})

//export class AuthService {
export class AccountService {
    private userSubject: BehaviorSubject<User>;
    public user: Observable<User>;
    public get userValue(): User {
        return this.userSubject.value;
    }


    constructor(
        private router: Router,
        private http: HttpClient
    ) {
        this.userSubject = new BehaviorSubject<User>(
            JSON.parse(localStorage.getItem('user')));
        this.user = this.userSubject.asObservable();
    }

    //constructor(private http: HttpClient) { }
  
     login(username: string, password: string): Observable<LoggedInUser> {
       return this.http.post(
         'http://localhost:8000/api-user-login/', { username, password }
         ) as Observable<LoggedInUser>;
     }
  
    setLoggedInUser(userData: LoggedInUser): void {
      if (localStorage.getItem('userData') !== JSON.stringify(userData)) {
        localStorage.setItem('userData', JSON.stringify(userData));
      }
     }

     logout() {
        // remove user from local storage and set current user to null
        localStorage.removeItem('user');
        this.userSubject.next(null);
        this.router.navigate(['/account/login']);
    }

    register(user: User) {
        console.log(`${environment.apiUrl}/account/register`,user)
        return this.http.post(`${environment.apiUrl}/account/register`, user);
    }
    }
  
export class zzAccountService {
    
    private userSubject: BehaviorSubject<User>;
    public user: Observable<User>;

    public get userValue(): User {
        return this.userSubject.value;
    }

    constructor(
        private router: Router,
        private http: HttpClient
    ) {
        this.userSubject = new BehaviorSubject<User>(
            JSON.parse(localStorage.getItem('user')));
        this.user = this.userSubject.asObservable();
    }

    // accès user en stockage local
    login(email, password) {
        return this.http.post<User>(`${environment.apiUrl}/account/authenticate`, { email, password })
            .pipe(map(user => {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('user', JSON.stringify(user));
                this.userSubject.next(user);
                return user;
            }));
    }

    logout() {
        // remove user from local storage and set current user to null
        localStorage.removeItem('user');
        this.userSubject.next(null);
        this.router.navigate(['/account/login']);
    }

    register(user: User) {
        console.log(`${environment.apiUrl}/account/register`,user)
        return this.http.post(`${environment.apiUrl}/account/register`, user);
    }
}

