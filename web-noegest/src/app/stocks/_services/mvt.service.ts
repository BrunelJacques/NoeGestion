import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';

import { catchError, map, of } from 'rxjs';

import { Mouvement } from '../_models/Mouvement';
import { Camp } from '../_models/camp';
import { Params } from '../_models/params';

import { environment } from '@environments/environment';
import { Constantes } from "../../constantes";

@Injectable({ providedIn: 'root'})

export class MvtService {

  httpOptions = { headers: new HttpHeaders({'Content-Type': 'application/json'})};
  private paramsSubject: BehaviorSubject<Params>;
  public params: Observable<Params>;

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

  getSorties(): Observable<Mouvement[]> {
    return this.http.get<Mouvement[]>(this.constantes.MVTS_URL)
      .pipe(
        //tap(_ => this.log('fetched mvts')),
        catchError(this.handleError<Mouvement[]>('getSorties', []))
      );
      }

  getCamps(): Observable<Camp[]> {
    return this.http.get<Camp[]>(this.constantes.CAMPS_URL)
      .pipe(
        tap(_ => this.log('fetched camps')),
        catchError(this.handleError<Camp[]>('getCamps', []))
      );
  }

  getParams():  Observable<Params[]> {
    return this.http.get<Params[]>(this.constantes.PARAMS_URL)
      .pipe(
        tap(_ => this.log('fetched params')),
        catchError(this.handleError<Params[]>('getParams', []))
      );
  }

  // stockage de l'info en local
  setParams(params: Params) {
    return this.http.post(`${environment.apiUrl}/params`, params);
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

  private log(message: string) {console.log('mvtService.log',message)}
}
