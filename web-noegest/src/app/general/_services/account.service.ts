import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '@environments/environment';
import { User } from '@app/general/_models';
import { ChoixAppli } from '@app/general/_models';

@Injectable({ providedIn: 'root' })

export class AccountService {
    private userSubject: BehaviorSubject<User>;
    public user: Observable<User>;
    private choixAppliSubject: BehaviorSubject<ChoixAppli>;
    public choixAppli: Observable<ChoixAppli>;

    constructor(
        private router: Router,
        private http: HttpClient
    ) {
        this.userSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('user')));
        this.user = this.userSubject.asObservable();
        this.choixAppliSubject = new BehaviorSubject<ChoixAppli>(JSON.parse(localStorage.getItem('choixAppli')));
        this.choixAppli = this.choixAppliSubject.asObservable()
    }

    public get userValue(): User {
        return this.userSubject.value;
    }

    public get getChoixAppli() {
        return this.choixAppli
    }

    setChoixAppli(choixAppli) {
        this.choixAppliSubject = choixAppli
        return 
    }

    login(username, password) {
        return this.http.post<User>(`${environment.apiUrl}/account/authenticate`, { username, password })
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
        return this.http.post(`${environment.apiUrl}/account/register`, user);
    }

}
