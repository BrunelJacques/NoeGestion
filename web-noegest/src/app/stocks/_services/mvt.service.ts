import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, tap, catchError, of } from 'rxjs';

import { Mouvement } from '../_models/mouvement';
import { Params } from '../_models/params';

import { Constantes } from '@app/constantes';

@Injectable({ providedIn: 'root'})

export class MvtService {

  httpOptions = { headers: new HttpHeaders({'Content-Type': 'application/json'})};
  private paramsSubject: BehaviorSubject<Params>;
  private url = ''
  public params: Observable<Params>;
  public test:any

  public get paramsValue(): Params {
    return this.paramsSubject.value;
  }

  constructor(
    private constantes: Constantes,
    private http: HttpClient,
  ) {
    this.paramsSubject = new BehaviorSubject<Params>(
      JSON.parse(localStorage.getItem('params')));
  this.params = this.paramsSubject.asObservable();
  }

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

  getSorties(): Observable<Mouvement[]> {
    this.url = this.constantes.STMOUVEMENT_URL+"/?origine=repas&jour=2022-09-17";
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
