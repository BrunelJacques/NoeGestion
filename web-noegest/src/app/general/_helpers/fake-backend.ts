import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, materialize, dematerialize } from 'rxjs/operators';

// array in local storage for registered users
const usersKey = 'angular-registration-login-users';
const paramsKey = 'angular-registration-stocks-lsparams';
let users = JSON.parse(localStorage.getItem(usersKey)) || [];
// local storage params
let lsparams = JSON.parse(localStorage.getItem(paramsKey)) || [];

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const { url, method, headers, body } = request;
        console.log('intercept ', url)
        return handleRoute();

        function handleRoute() {
            switch (true) {
                case url.endsWith('/account/authenticate') && method === 'POST':
                    return authenticate();
                case url.endsWith('/account/register') && method === 'POST':
                    return register();
                case url.endsWith('/users') && method === 'GET':
                    return getUsers();
                case url.endsWith('/params') && method === 'POST':
                    return setParams();
                case url.endsWith('/params') && method === 'GET':
                    return getParams();
                default:
                    // pass through any requests not handled above
                    return next.handle(request);
            }    
        }

        // route functions
        function authenticate() {
            const { email, password } = body;
            const user = users.find(x => x.email === email && x.password === password);
            if (!user) return error('Username or password is incorrect');
            return ok({
                ...basicDetails(user),
                token: 'fake-jwt-token'
            })
        }

        function register() {
            const user = body

            if (users.find(x => x.email === user.email)) {
                return error('"le mail "' + user.email + '" existe déjà')
            }

            user.id = users.length ? Math.max(...users.map(x => x.id)) + 1 : 1;
            users.push(user);
            localStorage.setItem(usersKey, JSON.stringify(users));
            return ok();
        }

        function getUsers() {
            if (!isLoggedIn()) return unauthorized();
            return ok(users.map(x => basicDetails(x)));
        }

        function getParams() {
            //if (!isLoggedIn()) return unauthorized();
            // only one possible record
            return ok(lsparams.map(x => x));
        }

        function setParams() {
            if (!isLoggedIn()) return unauthorized();
            const params = body
            if (lsparams.length === 0) {
                // first record
                lsparams.push(params);
                localStorage.setItem(paramsKey, JSON.stringify(lsparams));
                return ok();
            }
            // update and save record
            let record = lsparams.first()
            Object.assign(record, params);
            localStorage.setItem(usersKey, JSON.stringify(lsparams));
        }


        // helper functions

        function ok(body?) {
            return of(new HttpResponse({ status: 200, body }))
                .pipe(delay(500)); // delay observable to simulate server api call
        }

        function error(message) {
            return throwError({ error: { message } })
                .pipe(materialize(), delay(500), dematerialize()); // call materialize and dematerialize to ensure delay even if an error is thrown (https://github.com/Reactive-Extensions/RxJS/issues/648);
        }

        function unauthorized() {
            return throwError({ status: 401, error: { message: 'Unauthorized' } })
                .pipe(materialize(), delay(500), dematerialize());
        }

        function basicDetails(user) {
            const { id, email, firstName, lastName } = user;
            return { id, email, firstName, lastName };
        }

        function isLoggedIn() {
            return headers.get('Authorization') === 'Bearer fake-jwt-token';
        }

        function idFromUrl() {
            const urlParts = url.split('/');
            return parseInt(urlParts[urlParts.length - 1]);
        }
    }
}

export const fakeBackendProvider = {
    // use fake backend in place of Http service for backend-less development
    provide: HTTP_INTERCEPTORS,
    useClass: FakeBackendInterceptor,
    multi: true
};