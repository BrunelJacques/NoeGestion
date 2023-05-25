import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '@environments/environment';
import { AuthenticationService } from '../_services';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(private authenticationService: AuthenticationService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add auth header with jwt if user is logged in and request is to the api url
        const user = this.authenticationService.userValue;
        const isLoggedIn = user?.jwtToken;
        const isApiUrl = request.url.startsWith(environment.apiUrl);
        const isRefresh = request.url.endsWith('refresh/')
        if (isLoggedIn && isApiUrl) {
            if (isRefresh) {          
                request = request.clone({
                    setHeaders: { Authorization: `Bearer ${user.jwtToken}` },
                    body: { refresh: '${user.refresh}' }
                });
            }
            else {
                request = request.clone({
                    setHeaders: { Authorization: `Bearer ${user.jwtToken}` }
                });  
            }
        
        }
        return next.handle(request);
    }
}