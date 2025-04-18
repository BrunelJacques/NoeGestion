import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { AuthenticationService } from '../_services';

@Injectable({
  providedIn: 'root'
})

export class ErrorInterceptor implements HttpInterceptor {
  constructor(private authenticationService: AuthenticationService) {}

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(catchError(err => {
      if ([401, 403].includes(err.status) && this.authenticationService.userValue)
      {
        // auto logout if 401 or 403 response returned from api
        this.authenticationService.logout();
      }
      const error = (err && err.error && (err.error.message || err.message )) || err.statusText;
      console.error('ErrorIntercept:',err);
      return throwError(() => error);
    }))
  }
}


// Façon Tour of Heroes: gestion erreur et extrait result du retour-requete
export class HandleError  {

  public handleError<T>(operation = 'operation', result?: T) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return (error: any): Observable<T> => {
      this.log(`${operation} HandleError: ${error.message}`);
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a HeroService message with the MessageService */
  public log(message: string) {
    console.log(message)
    //this.messageService.add(`HeroService: ${message}`);
  }
}
