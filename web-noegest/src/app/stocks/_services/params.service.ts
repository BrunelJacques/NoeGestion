import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, catchError, of, tap } from 'rxjs';
import { hoursDelta, deepCopy } from '../../general/_helpers/fonctions-perso';
import { DatePipe } from '@angular/common';

import { Params,  PARAMS, Camp, Fournisseur, Rayon, Magasin } from '../_models/params';
import { Constantes } from 'src/app/constantes';
import { Mouvement } from '../_models/mouvement';
import { HandleError } from 'src/app/general/_helpers/error.interceptor';

@Injectable({ providedIn: 'root'})

export class ParamsService {
  lstservice = Constantes.LSTSERVICE;
  lstservice_code = this.lstservice.map((x) => x.code)
  public paramssubj$= new BehaviorSubject<Params>(PARAMS);
  private key = "stParams";
  public camps: Camp[] = [];
  public fournisseurs: Fournisseur[] = [];
  public rayons: Rayon[] = [] ;
  public magasins: Magasin[] = [];

  public mvts: Mouvement[] = [];

  constructor(    
    private constantes: Constantes,
    private http: HttpClient,
    private handleError: HandleError,
    private datePipe: DatePipe
    ){
      const param = this.getStoredParams()
      if (param) 
      { this.paramssubj$.next(param) }
    }


  initParams() {
    this.getCamps()
    this.getFournisseurs()
    this.getMagasins()
    this.getRayons()
  }
  
  // stockage de l'info en local & affectation subject
  setParams(item: Params) {
    localStorage.setItem(this.key, JSON.stringify(item))
    this.paramssubj$.next(item)
  }

  getStoredParams() {
    const key = localStorage.getItem(this.key)
    if (key === null ) 
    {return}
    else
    { return this.ajusteParams(JSON.parse(key)) }
  }

  ajusteParams(params:Params){
    // >6 heures après le dernier paramétrage, on réinitialise Params
    if (!(params instanceof Object)){
      params = deepCopy(PARAMS)
    }
    if (hoursDelta(new Date(params.modif),new Date()) > 6) {
      params = deepCopy(PARAMS)
      params.parent = "raz-sorties"
    }
    this.setParams(params)
    return params
  }

  paramsToForm(params:Params,form:any){
    if (!params.service || params.service < 0){ 
      params.service = 0 }
    form.patchValue({
      'jour': this.datePipe.transform(params.jour, 'yyyy-MM-dd'),
      'origine': params.origine,
      'camp': params.camp,
      'tva': params.tva,
      'service': this.lstservice[params.service].code,
      'fournisseur': params.fournisseur,
    })
  }

  formToParams(form:{value:any}, params:Params):void {
    if (form.value.origine != 'camp') {
      form.value.camp = '00'}
    params.jour = new Date(form.value.jour),
    params.origine = form.value.origine,
    params.camp = form.value.camp,
    params.service = this.lstservice_code.indexOf(form.value.service),
    params.fournisseur = form.value.fournisseur,
    params.tva = form.value.tva
  }

  /* GET heroes adapté pour exemple */
  searchCamps(term: string): Observable<Camp[]> {
    if (!term.trim()) {
      // if not search term, return empty hero array.
      return of([]);
    }
    const url = this.constantes.GEANALYTIQUE_URL+"?axe=ACTIVITES&obsolete=False"
    return this.http.get<Camp[]>(url)
      .pipe(
        tap(x => x.length ?
          this.handleError.log(`found lignes matching "${term}"`) :
          this.handleError.log(`no lignes matching "${term}"`)),
        catchError(this.handleError.handleError<Camp[]>('searchCampes', []))
      );
  }
    
  getHttp(url:string)  {
    this.http.get<[]>(url)
      .pipe(
        catchError(this.handleError.handleError<any>('getHttp',{'results':[]})),
      )
      .subscribe(
        data => {
          const container = data['results']
          this.handleError.log(`lus: ${container.length} ${url}`)
          return container
        }
      )
    return []
  }

  getCamps():Camp[] {
    const url = this.constantes.GEANALYTIQUE_URL+"?axe=ACTIVITES&obsolete=False"
    this.http.get<[]>(url)
      .pipe(
        catchError(this.handleError.handleError<any>('getHttp',{'results':[]})),
      )
      .subscribe(
        (data: { [x: string]: any; }) => {
          this.camps = data['results']
        }
      )
      return this.camps
    }
  
  getFournisseurs() {
    if (this.fournisseurs.length == 0) {
      const url = this.constantes.STFOURNISSEUR_URL
      this.fournisseurs = this.getHttp(url)
    }
    return this.fournisseurs
  }

  getRayons() {
    if (this.rayons.length == 0) {
      const url = this.constantes.STRAYON_URL
      this.rayons = this.getHttp(url)
    }
    //return this.rayons
  }

  getMagasins() {
    if (this.magasins.length == 0) {
      const url = this.constantes.STMAGASIN_URL
      this.magasins = this.getHttp(url)
    }
    //return this.magasins
  }

}

