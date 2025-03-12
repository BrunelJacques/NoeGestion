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
    let nbrations = mvt.article.rations ?? 1
    nbrations *= mvt.qtemouvement
    if (mvt.nbrations) {nbrations = mvt.nbrations}
    mvt.nbrations =  Math.abs(nbrations)

    // afficher le stock après mouvement
    mvt.article.qte_stock ? (mvt.article.qte_stock += mvt.qtemouvement) : 0
  }

  mvtToForm(mvt:Mouvement,form:FormGroup): boolean {
    const fp = this.fp
    
    form.patchValue({
      'Jour': this.datePipe.transform(mvt.jour, 'dd/MM/yyyy'),
      'Vers': this.lstOrigine_lib[this.lstOrigine_cod.indexOf(mvt.origine)],
      //'Camp': this.lstCamps_lib[this.lstCamps_cod.indexOf(mvt.analytique)],
      'Service': this.lstService_libelle[mvt.service],
      'PrixUnit': fp.round(mvt.prixunit,2),
      'Qte': mvt.qtemouvement * mvt.sens,
      'TotRations': mvt.nbrations,
      'CoutRation': fp.round(fp.quotient(mvt.prixunit, mvt.nbrations)),
      'QteStock': mvt.article.qte_stock
    })
    form.get('CoutRation')?.disable()
    form.get('QteStock')?.disable()
    return true
  }

  async formToMvt(form:FormGroup, mvt:Mouvement): Promise<void>  {
    if (!mvt) return
    const qteOld = mvt.qtemouvement
    mvt.jour = this.fp.dateFrToIso(form.get('Jour')?.value),
    mvt.origine = form.get('Vers')?.value,
    mvt.origine = this.lstOrigine_cod[this.lstOrigine_lib.indexOf(form.get('Vers')?.value)]
    mvt.service = this.lstService_libelle.indexOf(form.get('Service')?.value),
    mvt.prixunit = form.get('PrixUnit')?.value
    mvt.qtemouvement = form.get('Qte')?.value * mvt.sens
    mvt.nbrations = form.get('TotRations')?.value
    // remettre le stock à son niveau avant mouvement
    mvt.article.qte_stock ? (mvt.article.qte_stock  -= qteOld) : 0
  }

  retroQteStock(mvt:Mouvement) :Mouvement {
    // stock dans mvt avant le mouvement, sera affiché après mouvement
    const idMvt = mvt.id ?? 0
    // ignoré si nouveau mvt non encore pris en compte
    if (idMvt > 0) {
      let qteStock = mvt.article.qte_stock ?? 0
      qteStock -= mvt.qtemouvement
      mvt.article.qte_stock = qteStock
    }
    return mvt
  }
}
