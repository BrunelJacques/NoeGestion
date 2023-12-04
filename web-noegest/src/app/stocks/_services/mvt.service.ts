import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap, catchError, map } from 'rxjs';

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
  getMvt(id: string): Observable<Mouvement> {
    this.url = this.cst.STMOUVEMENT_URL+"/?id="+id;
    return this.http.get<Mouvement[]>(this.url)
      .pipe(
        tap(x => x.length ?
          this.handleError.log(`fetched mvt id=${id}`) :
          this.handleError.handleError<Mouvement[]>(`getMvt id=${id}`)),
        catchError(this.handleError.handleError<Mouvement[]>(`getMvt id=${id}`)),
        map(mvts => mvts[0])
      );
  }

  updateMvt(id:string) {
    return this.getMvt(id)
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
