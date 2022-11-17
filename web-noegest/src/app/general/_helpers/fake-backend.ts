import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, materialize, dematerialize } from 'rxjs/operators';
import { Params } from '@app/stocks/_models/params';
import { PARAMS } from '@app/stocks/_models/params';

// array in local storage for registered users and params
//" AppDataLocalGoogleChromeUser DataDefault Stockage local " sous Windows,"
const usersKey = 'angular-registration-login-users';
const paramsKey = 'angular-registration-stocks-lstparams';
let users = JSON.parse(localStorage.getItem(usersKey)) || [];
// local storage params
let lstparams = JSON.parse(localStorage.getItem(paramsKey)) || [];

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const { url, method, headers, body } = request;
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
            if (!lstparams[0].jour){ initParams() }           
            // only one record is possible
            return ok(lstparams.map(x => x));
        }

        function initParams() {
            //if (!isLoggedIn()) { return unauthorized(); }

            if (lstparams.length === 0) {
                // first record
                lstparams.push(PARAMS);
                localStorage.setItem(paramsKey, JSON.stringify(lstparams));
                return ok();
            }
            // update and save record
            let record = lstparams[0]
            Object.assign(record, PARAMS);
            localStorage.setItem(paramsKey, JSON.stringify(lstparams));
        }


        function setParams() {
            //if (!isLoggedIn()) return unauthorized();
            const params = body
            if (lstparams.length === 0) {
                // first record
                lstparams.push(params);
                localStorage.setItem(paramsKey, JSON.stringify(lstparams));
                return ok();
            }
            // update and save record
            let record = lstparams[0]
            Object.assign(record, params);
            localStorage.setItem(paramsKey, JSON.stringify(lstparams));

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