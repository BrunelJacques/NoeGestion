/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, catchError, of, tap } from 'rxjs';
import { hoursDelta, deepCopy } from '../../general/_helpers/fonctions-perso';

import { Params,  PARAMS, Camp, Fournisseur, Rayon, Magasin } from '../_models/params';
import { Constantes } from 'src/app/constantes';
import { Mouvement } from '../_models/mouvement';
import { HandleError } from 'src/app/general/_helpers';

@Injectable({ providedIn: 'root'})

export class ParamsService {
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
    private handleError: HandleError
    ){
      this.initParams()
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
    { return JSON.parse(key); }
  }

  ajusteParams(params:Params){
    // >6 heures après le dernier paramétrage, on réinitialise Params
    params.parent = "sorties"
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
  
  getCamps() {
    if (this.camps.length == 0) {
      const url = this.constantes.GEANALYTIQUE_URL+"?axe=ACTIVITES&obsolete=False"
      this.camps = this.getHttp(url)
    }
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

