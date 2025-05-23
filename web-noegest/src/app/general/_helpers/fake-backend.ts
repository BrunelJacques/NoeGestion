﻿// pour test, fake_backends permet de substituer une gestion locale des users à l'accès port 8000 
import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, mergeMap, materialize, dematerialize } from 'rxjs/operators';
import { User } from '../_models';

// array in local storage for users
const usersKey = 'angular-14-jwt-refresh-token-users';
const users: [User] = JSON.parse(localStorage.getItem(usersKey)!) || [];

// add test user and save if users array is empty
if (!users.length) {
    users.push(
        {
            id: 1, firstName: 'Test', lastName: 'User', username: 'test', password: 'test', refresh: '',
            email: ''
        },
    );
    localStorage.setItem(usersKey, JSON.stringify(users));
}

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {
    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        const { url, method, headers, body } = request;
    

        // wrap in delayed observable to simulate server api call
        return of(null)
            .pipe(mergeMap(handleRoute))
            .pipe(materialize()) // call materialize and dematerialize to ensure delay even if an error is thrown (https://github.com/Reactive-Extensions/RxJS/issues/648)
            .pipe(delay(500))
            .pipe(dematerialize());

        function handleRoute() {
            switch (true) {
                case url.endsWith('/users/authenticate') && method === 'POST':
                    return authenticate();
                case url.endsWith('/users/refresh-token') && method === 'POST':
                    return refreshToken();
                case url.endsWith('/users/revoke-token') && method === 'POST':
                    return revokeToken();
                case url.endsWith('/users') && method === 'GET':
                    return getUsers();
                default:
                    // pass through any requests not handled above
                    return next.handle(request);
            }    
        }

        // route functions
        function authenticate() {
            // Explicitly cast 'body' as an expected type
            const requestBody = body as { username: string; password: string };
        
            const username = requestBody.username;
            const password = requestBody.password;
            const user = users.find(x => x.username === username && x.password === password);
        
            if (!user) return error('Username or password is incorrect');
        
            // Ensure 'user' is correctly handled before accessing properties
            const validUser: User = user as User;
        
            // Add refresh token to user
            validUser.refresh = generateRefreshToken();
            localStorage.setItem(usersKey, JSON.stringify(users));
        
            return ok({
                id: validUser.id,
                username: validUser.username,
                firstName: validUser.firstName,
                lastName: validUser.lastName,
                jwtToken: generateJwtToken()
            });
        }
       
        function refreshToken() {
            const refreshToken = getRefreshToken();
            
            if (!refreshToken) return unauthorized();

            const user = users.find(x => x.refresh?.includes(refreshToken));

            if (!user) return unauthorized();

            // replace old refresh token with a new one and save
            user.refresh = generateRefreshToken();
            localStorage.setItem(usersKey, JSON.stringify(users));

            return ok({
                id: user.id,
                username: user.username,
                firstName: user.firstName,
                lastName: user.lastName,
                jwtToken: generateJwtToken()
            })
        }

        function revokeToken() {
            if (!isLoggedIn()) return unauthorized();            
            // revoke token and save
            localStorage.setItem(usersKey, JSON.stringify(users));

            return ok();
        }

        function getUsers() {
            if (!isLoggedIn()) return unauthorized();
            return ok(users);
        }

        // helper functions

        function ok(body?: unknown) {
            return of(new HttpResponse({ status: 200, body }))
        }

        function error(message: string) {
            return throwError(() => ({ error: { message } }));
        }

        function unauthorized() {
            return throwError(() => ({ status: 401, error: { message: 'Unauthorized' } }));
        }

        function isLoggedIn() {
            // check if jwt token is in auth header
            const authHeader = headers.get('Authorization') || '';
            if (!authHeader.startsWith('Bearer fake-jwt-token'))
                return false;

            // check if token is expired
            const jwtToken = JSON.parse(atob(authHeader.split('.')[1]));
            const tokenExpired = Date.now() > (jwtToken.exp * 1000);
            if (tokenExpired)
                return false;

            return true;
        }

        function generateJwtToken() {
            // create token that expires in 15 minutes
            const tokenPayload = { exp: Math.round(new Date(Date.now() + 15*60*1000).getTime() / 1000) }
            return `fake-jwt-token.${btoa(JSON.stringify(tokenPayload))}`;
        }

        function generateRefreshToken() {
            const token = new Date().getTime().toString();

            // add token cookie that expires in 7 days
            const expires = new Date(Date.now() + 7*24*60*60*1000).toUTCString();
            document.cookie = `fakeRefreshToken=${token}; expires=${expires}; path=/`;

            return token;
        }

        function getRefreshToken() {
            // get refresh token from cookie
            return (document.cookie.split(';').find(x => x.includes('fakeRefreshToken')) || '=').split('=')[1];
        }
    }
}

// use fake backend in place of Http service for backend-less development
/*
export let fakeBackendProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: FakeBackendInterceptor,
    multi: true
};*/