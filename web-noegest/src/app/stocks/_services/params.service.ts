import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, catchError, of } from 'rxjs';
import { hoursDelta, deepCopy } from '../../general/_helpers/fonctions-perso';

import { Params,  PARAMS, Camp, Fournisseur, Rayon, Magasin } from '../_models/params';
import { Constantes } from 'src/app/constantes';

@Injectable({ providedIn: 'root'})

export class ParamsService {
  public paramssubj$= new BehaviorSubject<Params>(PARAMS);

  private key: string = "stParams";
  public camps: Camp[] = [];
  public fournisseurs: Fournisseur[] = [];
  public rayons: Rayon[] = [];
  public magasins: Magasin[] = [];


  constructor(
    private constantes: Constantes,
    private http: HttpClient){
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
    return JSON.parse(localStorage.getItem(this.key));
  }

  ajusteParams(params:Params){
    // >6 heures après le dernier paramétrage, on réinitialise Params
    params.parent = "sorties"
    if (!(params instanceof Object)){
      params = deepCopy(PARAMS)
    };
    if (hoursDelta(new Date(params.modif),new Date()) > 6) {
      params = deepCopy(PARAMS)
      params.parent = "raz-sorties"
    };
    this.setParams(params)
    return params
  }


  getCamps() {
    if (this.camps.length == 0) {
      const url = this.constantes.GEANALYTIQUE_URL+"?axe=ACTIVITES&obsolete=False"
      this.http.get<Camp[]>(url)
        .pipe(
          catchError(this.handleError<any>('getCamps',{'results':[]})),
        )
        .subscribe(
          camps => {
            this.camps = camps['results']
            this.log(`lus: ${this.camps.length} camps`)
          }
        )
    }
    return this.camps
  }

  getFournisseurs() {
    if (this.fournisseurs.length == 0) {
      const url = this.constantes.STFOURNISSEUR_URL
      this.http.get<Fournisseur[]>(url)
        .pipe(
          catchError(this.handleError<any>('getFournisseurs',{'results':[]})),
        )
        .subscribe(
          fournisseurs => {
            this.fournisseurs = fournisseurs['results']
            this.log(`lus: ${this.fournisseurs.length} fournisseurs`)
          }
        )
    }
    return this.fournisseurs
  }

  getRayons() {
    if (this.rayons.length == 0) {
      const url = this.constantes.STRAYON_URL
      this.http.get<Rayon[]>(url)
        .pipe(
          catchError(this.handleError<any>('getRayons',{'results':[]})),
        )
        .subscribe(
          rayons => {
            this.rayons = rayons['results']
            this.log(`lus: ${this.rayons.length} rayons`)
          }
        )
    }
    return this.rayons
  }

  getMagasins() {
    if (this.magasins.length == 0) {
      const url = this.constantes.STMAGASIN_URL
      this.http.get<Magasin[]>(url)
        .pipe(
          catchError(this.handleError<any>('getMagasins',{'results':[]})),
        )
        .subscribe(
          magasins => {
            this.magasins = magasins['results']
            this.log(`lus: ${this.magasins.length} magasins`)
          }
        )
    }
    return this.magasins
  }

  // gestion erreur façon Tour of Heroes
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); // log to console instead
      this.log(`${operation} failed: ${error.message}`);
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  private log(message: string) {console.log('mvtService.log: ',message)}
}

