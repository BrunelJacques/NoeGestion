import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable,of } from 'rxjs';
import { catchError, tap } from 'rxjs';

import { Mouvement } from '../_models/Mouvement';
import { Camp } from '../_models/camp';
import {Constantes} from "../../constantes";

@Injectable({ providedIn: 'root'})

export class MvtService {

  httpOptions = { headers: new HttpHeaders({'Content-Type': 'application/json'})};

  constructor(
    private constantes: Constantes,
    private http: HttpClient,
  ) {}

  getSorties(): Observable<Mouvement[]> {
    return this.http.get<Mouvement[]>(this.constantes.MVTS_URL)
      .pipe(
        tap(_ => this.log('fetched mvts')),
        catchError(this.handleError<Mouvement[]>('getSorties', []))
      );
      }

  getCamps(): Observable<Camp[]> {
    return this.http.get<Camp[]>(this.constantes.MVTS_URL)
      .pipe(
        tap(_ => this.log('fetched camps')),
        catchError(this.handleError<Camp[]>('getCamps', []))
      );
      }
  
    

  // gestion erreur façon Tour of Heroes
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); // log to console instead
      this.log(`${operation} failed: ${error.message}`);
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  private log(message: string) {console.log(message)}
}
