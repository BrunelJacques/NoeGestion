import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap, catchError, of } from 'rxjs';
//import { DatePipe } from '@angular/common';

import { Mouvement } from '../_models/mouvement';
import { ParamsService } from './params.service';
import { Params } from '../_models/params';

import { Constantes } from 'src/app/constantes';
import { AlertService } from 'src/app/general/_services';

@Injectable({ providedIn: 'root'})

export class MvtService {
  mvts: Mouvement[] = []
  url: string


  constructor(
    private constantes: Constantes,
    private http: HttpClient,
    private paramsService: ParamsService,
    private alertService: AlertService,
    //private datePipe: DatePipe,
  ) {}

   /** GET mvt by id. Will 404 if id not found */
  getMvt(id: number): Observable<Mouvement> {
    return this.http.get<Mouvement>(this.constantes.STMOUVEMENT_URL+"/?id="+id)
      .pipe(
        tap(_ => this.log(`fetched mvt id=${id}`)),
        catchError(this.handleError<Mouvement>(`getMvt id=${id}`))
      );
  }

  updateMvt(id): Observable<Mouvement[]> {
    return id
  };

  getSorties(urlparams): Observable<Mouvement[]> {
    this.url = this.constantes.STMOUVEMENT_URL+urlparams;
    return (this.http.get<Mouvement[]>(this.url))
      .pipe(
        tap(_ => this.log('fetched mvts')),
        catchError(this.handleError<Mouvement[]>('getSorties', [])
        )
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

  private log(message: string) {console.log('mvtService.log: ',message)}
}
