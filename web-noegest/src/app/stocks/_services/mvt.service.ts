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
    private handleError: HandleError,
  ) {}

   /** GET mvt by id. Will 404 if id not found */
  getMvt(id: string): Observable<Mouvement> {
    this.url = this.cst.STMOUVEMENT_URL+"/?id="+id;
    return this.http.get<Mouvement>(this.url)
      .pipe(
        tap(() => this.handleError.log(`fetched mvt id=${id}`)),
        catchError(this.handleError.handleError<Mouvement>(`getMvt id=${id}`))
      );
  }

  updateMvt(id:string) {
    return this.getMvt(id)
  }

  getSorties(urlparams:string): Observable<{'results':[]}>{
    const url = this.cst.STMOUVEMENT_URL+urlparams;
    return this.http.get<[]>(url)
      .pipe(
        tap(x => x.length ?
          this.handleError.log(`found mvts`) :
          this.handleError.log(`no mvts`)),    
        catchError(
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          this.handleError.handleError<any>('getSorties',{'results':[]})
        )
      )
  }


}
