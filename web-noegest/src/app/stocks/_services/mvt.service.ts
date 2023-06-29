import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap, catchError } from 'rxjs';

import { Mouvement } from '../_models/mouvement';
import { HandleError } from 'src/app/general/_helpers/error.interceptor';

import { Constantes } from 'src/app/constantes';

@Injectable({ providedIn: 'root'})

export class MvtService {
  mvts: Mouvement[] = []
  url: string | undefined

  constructor(
    private cst: Constantes,
    private http: HttpClient,
    private he: HandleError,
  ) {}

   /** GET mvt by id. Will 404 if id not found */
  getMvt(id: string): Observable<Mouvement> {
    this.url = this.cst.STMOUVEMENT_URL+"/?id="+id;
    return this.http.get<Mouvement>(this.url)
      .pipe(
        tap(() => this.he.log(`fetched mvt id=${id}`)),
        catchError(this.he.handleError<Mouvement>(`getMvt id=${id}`))
      );
  }

  updateMvt(id:string) {
    return this.getMvt(id)
  }

  getSorties(urlparams:string) {
    const url = this.cst.STMOUVEMENT_URL+urlparams;
    this.http.get<Mouvement[]>(url)
      .pipe(
        catchError(
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          this.he.handleError<any>('getSorties',{'results':[]})
        )
      )
      .subscribe(
        mvts => {
          this.mvts = mvts['results']
          this.he.log(`mouvements lus: ${this.mvts.length}`)
        }
      )
    return this.mvts
  }

/*
  // old 
getSorties(urlparams): Observable<Mouvement[]> {
  this.url = this.cst.STMOUVEMENT_URL+urlparams;
  return (this.http.get<Mouvement[]>(this.url))
    .pipe(
      tap(() => this.log('fetched mvts')),
      catchError(this.handleError<Mouvement[]>('getSorties', [])
      )
    );
}
*/

}
