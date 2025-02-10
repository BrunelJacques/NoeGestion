import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, tap, catchError, map, of } from 'rxjs';

import { MvtsResponse, Mouvement } from '../_models/mouvement';
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

  getMvt(id: string): Observable<MvtsResponse> {
    const url = `${this.cst.STMOUVEMENT_URL}/?id=${id}`;
    console.log(url);
    return this.http.get<MvtsResponse>(url)
      .pipe(
        tap(x => x.count ?
          this.handleError.log(`fetched mvt id=${id}`) :
          this.handleError.log(`No mvt found for id=${id}`)
        ),
        catchError(this.handleError.handleError<MvtsResponse>(`getMvt id=${id}`))
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

  getSorties(urlparams:string): Observable<MvtsResponse>{
    const url = this.cst.STMOUVEMENT_URL+urlparams;
    console.log(url)
    return this.http.get<MvtsResponse>(url)
      .pipe(
        tap(x => x.count ?
          this.handleError.log(`found ${x.count} mvts`) :
          this.handleError.log(`no mvts`)),
        catchError(this.handleError.handleError<MvtsResponse>('getSorties',))
      );
  }


}
