import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, tap, catchError, map, of } from 'rxjs';

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
    private handleError: HandleError,
  ) {}

   /** GET mvt by id, http renvoie un tableau avec un seul item */
  getMvtOld(id: string): Observable<Mouvement> {
    this.url = this.cst.STMOUVEMENT_URL+"/?id="+id;
    return this.http.get<Mouvement[]>(this.url)
      .pipe(
        tap(x => x.length ?
          this.handleError.log(`fetched mvt id=${id}`) :
          this.handleError.handleError<Mouvement[]>(`getMvt id=${id}`) ),
        catchError(this.handleError.handleError<Mouvement[]>(`getMvt id=${id}`)),
        map(mvts => mvts[0])
      );
  }

  /** GET mvt by id, http returns a single item as an array */
  getMvt(id: string): Observable<Mouvement | null> {
    const params = new HttpParams().set('id', id); // Use HttpParams for URL parameters
    const url = this.cst.STMOUVEMENT_URL; // Keep URL clean and readable
    console.log(url)
    return this.http.get<Mouvement[]>(url, { params }).pipe(
      map((mvts) => (mvts.length > 0 ? mvts[0] : null)), // Safely map to the first item or null
      tap((mvt) =>
        mvt
          ? this.handleError.log(`Fetched mvt id=${id}`)
          : this.handleError.log(`No mvt found for id=${id}`)
      ),
      catchError((error) => {
        this.handleError.handleError<Mouvement[]>(`getMvt id=${id}`)(error);
        return of(null); // Return null or any fallback value on error
      })
    );
  }
  
  /** PUT mvt by id, http updates an existing item */
  putMvt(id: string, updatedMvt: Mouvement): Observable<Mouvement | null> {
    const params = new HttpParams().set('id', id); // Use HttpParams for URL parameters
    const url = this.cst.STMOUVEMENT_URL+'/';
    console.log(url)

    return this.http.put<Mouvement[]>(url, updatedMvt, { params }).pipe(
      map((mvts) => (mvts.length > 0 ? mvts[0] : null)), // Safely map to the updated item or null
      tap((mvt) =>
        mvt
          ? this.handleError.log(`Updated mvt id=${id}`)
          : this.handleError.log(`No mvt updated for id=${id}`)
      ),
      catchError((error) => {
        this.handleError.handleError<Mouvement[]>(`putMvt id=${id}`)(error);
        return of(null); // Return null or any fallback value on error
      })
    );
  }

  getSorties(urlparams:string): Observable<Mouvement[]>{
    const url = this.cst.STMOUVEMENT_URL+urlparams;
    return this.http.get<Mouvement[]>(url)
      .pipe(
        tap(x => x.length ?
          this.handleError.log(`found ${x.length} mvts`) :
          this.handleError.log(`no mvts`)),
        catchError(this.handleError.handleError<Mouvement[]>('getSorties',))
      );
  }


}
