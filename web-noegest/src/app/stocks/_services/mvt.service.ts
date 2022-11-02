import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable,of } from 'rxjs';
import { catchError, map, tap } from 'rxjs';

import { Mouvement } from '../_models/Mouvement';
import {Constantes} from "../../constantes";

@Injectable({
  providedIn: 'root'
})
export class MvtService {
  private mvtsUrl = 'api/mvts';  // URL to web api

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  constructor(
    private http: HttpClient,
    private constantes: Constantes,
  ) {}

  getSorties(): Observable<Mouvement[]> {
    return this.http.get<Mouvement[]>(this.mvtsUrl)
      .pipe(
        tap(_ => this.log('fetched mvts')),
        catchError(this.handleError<Mouvement[]>('getSorties', []))
      );
      }

  // version sans In Memory data service
  getMvts(): Observable<Mouvement[]> {
    return this.http.get<Mouvement[]>(this.constantes.SORTIES_URL);
  }

  // gestion erreur façon Tour of Heroes
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {}
}
