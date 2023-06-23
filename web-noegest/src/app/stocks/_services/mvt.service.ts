import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap, catchError, of } from 'rxjs';

import { Mouvement } from '../_models/mouvement';

import { Constantes } from 'src/app/constantes';

@Injectable({ providedIn: 'root'})

export class MvtService {
  mvts: Mouvement[] = []
  url: string


  constructor(
    private cst: Constantes,
    private http: HttpClient,
  ) {}

   /** GET mvt by id. Will 404 if id not found */
  getMvt(id): Observable<Mouvement> {
    this.url = this.cst.STMOUVEMENT_URL+"/?id="+id;
    return this.http.get<Mouvement>(this.url)
      .pipe(
        tap(() => this.log(`fetched mvt id=${id}`)),
        catchError(this.handleError<Mouvement>(`getMvt id=${id}`))
      );
  }

  updateMvt(id): Observable<Mouvement[]> {
    return id
  }

  getSorties(urlparams): Observable<Mouvement[]> {
    this.url = this.cst.STMOUVEMENT_URL+urlparams;
    return (this.http.get<Mouvement[]>(this.url))
      .pipe(
        tap(() => this.log('fetched mvts')),
        catchError(this.handleError<Mouvement[]>('getSorties', [])
        )
      );
  }

  // gestion erreur façon Tour of Heroes
  private handleError<T>(operation = 'operation', result?: T) {
    return (error): Observable<T> => {
      console.error(error); // log to console instead
      this.log(`${operation} failed: ${error.message}`);
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  private log(message: string) {console.log('mvtService.log: ',message)}
}
