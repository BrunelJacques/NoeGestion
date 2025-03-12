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

  lstOrigine = Constantes.LSTORIGINE_SORTIES;
  lstOrigine_cod = this.lstOrigine.map((x)=>x.code);
  lstOrigine_lib = this.lstOrigine.map((x)=>x.libelle);
  lstService_libelle = Constantes.LSTSERVICE.map((x) => x.libelle)

  constructor(
    private cst: Constantes,
    private http: HttpClient,
    private handleError: HandleError,
    private fp: FonctionsPerso,
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

  calculeMvt(mvt:Mouvement): void {
    console.log('calculeMvt deb',mvt.article.qte_stock,mvt.qte_mouvement)
    const rations = mvt.article.rations ?? 1
    mvt.nb_rations =  this.fp.produit(rations, Math.abs(mvt.qte_mouvement));
    mvt.prix_unit = mvt.article.prix_moyen ? mvt.article.prix_moyen : 0.0;
  }

  mvtToForm(mvt:Mouvement,form:FormGroup): boolean {
    console.log('mvtToForm deb',mvt.article.qte_stock,mvt.qte_mouvement)
    const fp = this.fp
    
    form.patchValue({
      'Jour': this.datePipe.transform(mvt.jour, 'dd/MM/yyyy'),
      'Vers': this.lstOrigine_lib[this.lstOrigine_cod.indexOf(mvt.origine)],
      //'Camp': this.lstCamps_lib[this.lstCamps_cod.indexOf(mvt.analytique)],
      'Service': this.lstService_libelle[mvt.service],
      'PrixUnit': fp.round(mvt.prix_unit,2),
      'Qte': mvt.qte_mouvement * mvt.sens,
      'TotRations': mvt.nb_rations,
      'CoutRation': fp.round(fp.quotient(mvt.prix_unit, mvt.nb_rations)),
      'QteStock': mvt.article.qte_stock
    })
    return true
  }

  formToMvt(form:FormGroup, mvt:Mouvement): boolean  {
    if (!mvt) return true
    console.log('formToMvt deb',mvt.article.qte_stock,mvt.qte_mouvement)
    mvt.jour = this.fp.dateFrToIso(form.get('Jour')?.value),
    mvt.origine = form.get('Vers')?.value,
    mvt.origine = this.lstOrigine_cod[this.lstOrigine_lib.indexOf(form.get('Vers')?.value)]
    mvt.service = this.lstService_libelle.indexOf(form.get('Service')?.value),
    mvt.prix_unit = form.get('PrixUnit')?.value
    mvt.qte_mouvement = form.get('Qte')?.value * mvt.sens
    mvt.nb_rations = form.get('TotRations')?.value
    return true
  }
}
