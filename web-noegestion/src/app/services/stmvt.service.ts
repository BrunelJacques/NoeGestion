import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable,of } from 'rxjs';
import { catchError, map, tap } from 'rxjs';

import { Mouvement } from '../models/stmouvement';
import { MessageService } from './general/message.service';

@Injectable({
  providedIn: 'root'
})

export class StMvtService {

  private mvtsUrl = 'api/mvts'; // URL to web api

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  getSorties(): Observable<Mouvement[]> {
    //this.messageService.add('StMvtService: cherche mvts');
    return this.http.get<Mouvement[]>(this.mvtsUrl)
    .pipe(
      tap(_ => this.log('appel mvts')),
      catchError(this.handleError<Mouvement[]>('getSorties', []))
    );
  }
  
  /** GET mvt by id. Return `undefined` when id not found */
  getSortieNo404<Data>(id: number): Observable<Mouvement> {
    const url = `${this.mvtsUrl}/?id=${id}`;
    return this.http.get<Mouvement[]>(url)
      .pipe(
        map(mvts => mvts[0]), // returns a {0|1} element array
        tap(h => {
          const outcome = h ? `fetched` : `did not find`;
          this.log(`${outcome} mvt id=${id}`);
        }),
        catchError(this.handleError<Mouvement>(`getSortie id=${id}`))
      );
  }

  /** GET mvt by id. Will 404 if id not found */
  getSortie(id: number): Observable<Mouvement> {
    //console.log('appel mouvement: ' + id)
    const url = `${this.mvtsUrl}/${id}`;
    return this.http.get<Mouvement>(url).pipe(
      tap(_ => this.log(`fetched mvt id=${id}`)),
      catchError(this.handleError<Mouvement>(`getSortie id=${id}`))
    );
  }

  /* GET mvts whose name contains search term */
  searchMvts(term: string): Observable<Mouvement[]> {
    if (!term.trim()) {
      // if not search term, return empty mvt array.
      return of([]);
    }
    return this.http.get<Mouvement[]>(`${this.mvtsUrl}/?name=${term}`).pipe(
      tap(x => x.length ?
          this.log(`found mvts matching "${term}"`) :
          this.log(`no mvts matching "${term}"`)),
      catchError(this.handleError<Mouvement[]>('searchMvts', []))
    );
  }

  //////// Save methods //////////

  /** POST: add a new mvt to the server */
  addMvt(mvt: Mouvement): Observable<Mouvement> {
    return this.http.post<Mouvement>(this.mvtsUrl, mvt, this.httpOptions).pipe(
      tap((newMvt: Mouvement) => this.log(`added mvt w/ id=${newMvt.id}`)),
      catchError(this.handleError<Mouvement>('addMvt'))
    );
  }

  /** DELETE: delete the mvt from the server */
  deleteMvt(id: number): Observable<Mouvement> {
    const url = `${this.mvtsUrl}/${id}`;

    return this.http.delete<Mouvement>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted mvt id=${id}`)),
      catchError(this.handleError<Mouvement>('deleteMvt'))
    );
  }

  /** PUT: update the mvt on the server */
  updateMvt(mvt: Mouvement): Observable<any> {
    return this.http.put(this.mvtsUrl, mvt, this.httpOptions).pipe(
      tap(_ => this.log(`updated mvt id=${mvt.id}`)),
      catchError(this.handleError<any>('updateMvt'))
    );
  }

  /**********************************************************************
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
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

  /** Log a MvtService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`StMvtService: ${message}`);
  }
}