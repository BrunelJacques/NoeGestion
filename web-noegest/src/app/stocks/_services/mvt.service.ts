import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, tap, catchError, map, of } from 'rxjs';

import { MvtsRetour, Mouvement } from '../_models/mouvement';
import { HandleError } from 'src/app/general/_helpers/error.interceptor';

import { Constantes } from 'src/app/constantes';
import { FormGroup } from '@angular/forms';
import { FonctionsPerso } from 'src/app/shared/fonctions-perso';
import { DatePipe } from '@angular/common';

@Injectable({ providedIn: 'root'})
export class MvtService {
  mvts: Mouvement[] = []
  url: string | undefined
  lstService = Constantes.LSTSERVICE;
  lstService_libelle = this.lstService.map((x) => x.libelle)

  constructor(
    private cst: Constantes,
    private http: HttpClient,
    private handleError: HandleError,
    private fxPerso: FonctionsPerso,
    private datePipe: DatePipe,
  ) {}

  getMvt(id: string): Observable<MvtsRetour> {
    const url = `${this.cst.STMOUVEMENT_URL}/?id=${id}`;
    
    return this.http.get<MvtsRetour>(url)
      .pipe(
        tap(x => x.count ?
          this.handleError.log(`fetched mvt id=${id}`) :
          this.handleError.log(`No mvt found for id=${id}`)
        ),
        catchError(this.handleError.handleError<MvtsRetour>(`getMvt id=${id}`))
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

  getSorties(urlparams:string): Observable<MvtsRetour>{
    const url = this.cst.STMOUVEMENT_URL+urlparams;
    console.log(url)
    return this.http.get<MvtsRetour>(url)
      .pipe(
        tap(x => x.count ?
          this.handleError.log(`found ${x.count} mvts`) :
          this.handleError.log(`no mvts`)),
        catchError(this.handleError.handleError<MvtsRetour>('getSorties',))
      );
  }

  mvtToForm(mvt:Mouvement,form:FormGroup){
    let nbrations = mvt.qtemouvement    
    if (mvt.nbrations) {nbrations = mvt.nbrations}

    const fx = this.fxPerso
    const coutRation = fx.round(fx.quotient(mvt.prixunit, mvt.nbrations))
    const artQteStock = mvt.article.qte_stock ?? 0
    const qteStock =artQteStock + mvt.qtemouvement

    form.patchValue({
      'Jour': this.datePipe.transform(mvt.jour, 'dd/MM/yyyy'),
      'Vers': mvt.origine,
      'Service': this.lstService_libelle[mvt.service],
      'PrixUnit': this.fxPerso.round(mvt.prixunit,2),
      'Qte': mvt.qtemouvement * mvt.sens,
      'TotRations': Math.abs(nbrations),
      'CoutRation': Math.abs(coutRation),
      'QteStock': qteStock
    })
    form.get('CoutRation')?.disable()
    form.get('QteStock')?.disable()
  }

  formToMvt(form:FormGroup, mvt:Mouvement):void {
    mvt.jour = new Date(form.value.Jour).toISOString(),
    mvt.origine = form.value.Vers,
    mvt.service = this.lstService_libelle.indexOf(form.value.Service),
    mvt.prixunit = form.value.PrixUnit
    mvt.qtemouvement = form.value.Qte
    //mvt.nbrations = form.TotRations
  }


}
