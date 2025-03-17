import { DatePipe } from '@angular/common';
import { FormGroup } from '@angular/forms';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, tap, catchError, map, of } from 'rxjs';

import { MvtsRetour, Mouvement } from '../_models/mouvement';
import { HandleError } from 'src/app/general/_helpers/error.interceptor';
import { Constantes } from 'src/app/constantes';
import { FonctionsPerso } from 'src/app/shared/fonctions-perso';
import { ParamsService } from './params.service';

@Injectable({ providedIn: 'root'})

export class MvtService {
  mvts: Mouvement[] = []
  url: string | undefined

  lstOrigine = Constantes.LSTORIGINE_SORTIES;
  lstOrigine_cod = this.lstOrigine.map((x)=>x.code);
  lstOrigine_lib = this.lstOrigine.map((x)=>x.libelle);
  lstService_lib = Constantes.LSTSERVICE.map((x) => x.libelle)
  lstCamps_lib!:string[]
  lstCamps_cod!:string[]

  constructor(
    private cst: Constantes,
    private http: HttpClient,
    private handleError: HandleError,
    private fp: FonctionsPerso,
    private datePipe: DatePipe,
    private paramsService: ParamsService,
  ) {}

  getCamps(): void {
    this.lstCamps_lib = this.paramsService.camps.map(x => this.fp.capitalize(x.nom))
    this.lstCamps_cod = this.paramsService.camps.map(x => x.id)
  }

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

  getFieldsForm() {
    if (!this.lstCamps_lib) this.getCamps()
    return [
      { label: 'Jour', type: 'date'},
      { label: 'Vers', type: 'select',
          options: this.lstOrigine_lib.slice(0,-1)},
      { label: 'Camp', type: 'select',
          options: this.lstCamps_lib},
      { label: 'Service', type: 'select',
          options: this.lstService_lib },
      { label: 'PrixUnit', type: 'number'},
      { label: 'Qte', type: 'number' },
      { label: 'TotRations', type: 'number' },
      { label: 'CoutRation', type: 'number' },
      { label: 'QteStock', type: 'number' },
    ]
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

  calcMvtAvant(mvt:Mouvement): void {
    if (Math.floor((mvt.rations??1) - (mvt.article.rations??1)) == 0) {
      mvt.rations = undefined;
    }
    if (mvt.prix_unit == 0){
      (mvt.prix_unit = mvt.article.prix_moyen ?? 0.0)
    }
    console.log('calcMvtAv',mvt.rations,mvt.prix_unit)
  }

  calcMvtAfter(old:Mouvement,mvt:Mouvement,totRations:number): void {
    console.log('calcMvtAfter_deb',mvt.rations,mvt.prix_unit)
    const deltaqte = mvt.qte_mouvement - old.qte_mouvement;
    if (deltaqte !== 0) {
      mvt.article.qte_stock? mvt.article.qte_stock += deltaqte : 0

      totRations *= this.fp.quotient(mvt.qte_mouvement,old.qte_mouvement)
      console.log('delta, totration',deltaqte,totRations)
    }
    const rations = this.fp.quotient(totRations,mvt.qte_mouvement*mvt.sens)
    mvt.rations = ((old.qte_mouvement * mvt.qte_mouvement)!= 0) ? rations : mvt.rations 
    if ((mvt.qte_mouvement != 0)
      && Math.floor((mvt.qte_mouvement * mvt.sens) - totRations) == 0) {
      mvt.rations = undefined;
    }
    console.log('calcMvtAfter_fin',mvt.rations,mvt.prix_unit)
  }

  mvtToForm(mvt:Mouvement,form:FormGroup): boolean {
    if (!this.lstCamps_lib) this.getCamps()

    const fp = this.fp
    const prixTot = mvt.prix_unit * mvt.qte_mouvement * mvt.sens
    let rations = mvt.article.rations ?? 1
    rations = mvt.rations ?? rations
    const totRations = rations * mvt.qte_mouvement * mvt.sens

    form.patchValue({
      'Jour': this.datePipe.transform(mvt.jour,'yyyy-MM-dd'),
      'Vers': this.lstOrigine_lib[this.lstOrigine_cod.indexOf(mvt.origine)],
      'Camp': this.lstCamps_lib[this.lstCamps_cod.indexOf(mvt.analytique)],
      'Service': this.lstService_lib[mvt.service],
      'PrixUnit': fp.round(mvt.prix_unit,4),
      'Qte': mvt.qte_mouvement * mvt.sens,
      'TotRations': totRations,
      'CoutRation': fp.round(fp.quotient(prixTot, totRations)),
      'QteStock': mvt.article.qte_stock
    })
    console.log('mvtToForm',mvt.rations,mvt.prix_unit)
    return true
  }

  formToMvt(form:FormGroup, mvt:Mouvement): boolean  {
    if (!mvt) return true
    const old = this.fp.deepCopy(mvt)
    mvt.jour = this.fp.dateFrToIso(form.get('Jour')?.value),
    mvt.origine = form.get('Vers')?.value,
    mvt.origine = this.lstOrigine_cod[this.lstOrigine_lib.indexOf(form.get('Vers')?.value)]
    mvt.service = this.lstService_lib.indexOf(form.get('Service')?.value),
    mvt.prix_unit = Number(form.get('PrixUnit')?.value)
    mvt.qte_mouvement = form.get('Qte')?.value * mvt.sens
    const totRations = form.get('TotRations')?.value
    console.log('formToMvt',mvt.rations,mvt.prix_unit)
    this.calcMvtAfter(old,mvt,totRations)
    return true
  }
}
