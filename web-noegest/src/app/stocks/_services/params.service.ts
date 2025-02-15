import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, catchError, map, tap } from 'rxjs';
import { FonctionsPerso } from '../../shared/fonctions-perso';
import { DatePipe } from '@angular/common';

import { Params,  PARAMS0, Camp, Fournisseur, Rayon, Magasin } from '../_models/params';
import { Constantes } from 'src/app/constantes';
import { Mouvement } from '../_models/mouvement';
import { HandleError } from 'src/app/general/_helpers/error.interceptor';
import { FormGroup } from '@angular/forms';

export interface CampsRetour {count: number; results: Camp[];}
export interface FournisseursRetour {count: number; results: Fournisseur[];}
export interface MagasinsRetour {count: number; results: Magasin[];}
export interface RayonsRetour {count: number; results: Rayon[];}

@Injectable({ providedIn: 'root'})

export class ParamsService {
  lstservice = Constantes.LSTSERVICE;
  lstservice_code = this.lstservice.map((x) => x.id)
  public paramsSubj$= new BehaviorSubject<Params>(PARAMS0);
  public campsSubj$= new BehaviorSubject<Camp[]>([]);
  private key = "stParams";
  public fournisseurs: Fournisseur[] = [];
  public rayons: Rayon[] = [] ;
  public magasins: Magasin[] = [];

  public mvts: Mouvement[] = [];

  constructor(
    private constantes: Constantes,
    private http: HttpClient,
    private handleError: HandleError,
    private datePipe: DatePipe,
    private fp: FonctionsPerso,
    ){
      this.getStoredParams()
      this.getCampsSubj()
      this.initParamsOptions()
    }


  initParamsOptions() {
    this.getFournisseurs()
    this.getMagasins()
    this.getRayons()
  }

  // stockage de l'info en local & affectation subject
  setParams(item: Params) {
    localStorage.setItem(this.key, JSON.stringify(item))
    this.paramsSubj$.next(item)
  }

  getStoredParams() {
    const key = localStorage.getItem(this.key)
    if (key === null )
    {return}
    else
    {  this.paramsSubj$.next(this.ajusteParams(JSON.parse(key))) }
  }

  ajusteParams(params:Params){
    // >6 heures après le dernier paramétrage, on réinitialise Params
    if (!(params instanceof Object)){
      params = this.fp.deepCopy(PARAMS0)
    }
    if (this.fp.hoursDelta(new Date(params.modif),new Date()) > 6) {
      params = this.fp.deepCopy(PARAMS0)
    }
    if (params.service == -1) {
      params.service = 0
    }
    this.setParams(params)
    return params
  }

  paramsToForm(params:Params,form:FormGroup){
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

  formToParams(form:{value:Params}, params:Params):void {
    if (form.value.origine != 'camp') {
      form.value.camp = '00'}
    params.jour = new Date(form.value.jour),
    params.origine = form.value.origine,
    params.camp = form.value.camp,
    params.service = this.lstservice_code.indexOf(form.value.service),
    params.fournisseur = form.value.fournisseur,
    params.tva = form.value.tva
  }

  getHttp(url:string)  {
    this.http.get<[]>(url)
      .pipe(
        catchError(this.handleError.handleError<unknown[]>('getHttp',[])),
      )
      .subscribe(
        data => {
          const container = data
          this.handleError.log(`lus: ${container.length} ${url}`)
          return container;
        }
      );
    return []
  }

  getCampsSubj(){
    const url = this.constantes.GEANALYTIQUE_URL+"?axe=ACTIVITES&obsolete=False"
    this.http.get<CampsRetour>(url)
      .pipe(
        catchError(this.handleError.handleError<CampsRetour>('getHttp', { count: 0, results: [] }))
      )
      .subscribe(
        (data) => {
          this.campsSubj$.next(data.results)
          console.log(this.campsSubj$)
        }
      );
    }

  // appelé par resolver route, avant ouverture de one-sortie, mis dans datax['camps']
  getCamps(){
    const url = this.constantes.GEANALYTIQUE_URL+"?axe=ACTIVITES&obsolete=False"
    return this.http.get<CampsRetour>(url)
      .pipe(
        tap(x => x.results ?
            this.handleError.log(`fetched getArticlesNom ${x.count} items`):
            this.handleError.log(`get ArticlesNom no items fetched`)),
        catchError(this.handleError.handleError<CampsRetour>(
          'getCamps',{ count: 0, results: [] }
        )),
        map(x=>x.results),
      )
    }

      getFournisseurs() {
    if (this.fournisseurs.length == 0) {
      const url = this.constantes.STFOURNISSEUR_URL
      this.http.get<FournisseursRetour>(url)
      .pipe(
        catchError(this.handleError.handleError<FournisseursRetour>('getHttp', { count: 0, results: [] }))
      )
      .subscribe(
        (data) => {
          this.fournisseurs = data.results
          console.log("Fournisseurs: ",this.fournisseurs)
        }
      );
    }
  }

  getRayons() {
    if (this.rayons.length == 0) {
      const url = this.constantes.STFOURNISSEUR_URL
      this.http.get<RayonsRetour>(url)
      .pipe(
        catchError(this.handleError.handleError<RayonsRetour>('getHttp', { count: 0, results: [] }))
      )
      .subscribe(
        (data) => {
          this.rayons = data.results
          console.log("Rayons: ",this.rayons)
        }
      );
    }
  }

  getMagasins() {
    if (this.magasins.length == 0) {
      const url = this.constantes.STFOURNISSEUR_URL
      this.http.get<MagasinsRetour>(url)
      .pipe(
        catchError(this.handleError.handleError<MagasinsRetour>('getHttp', { count: 0, results: [] }))
      )
      .subscribe(
        (data) => {
          this.magasins = data.results
          console.log("Magasins: ",this.magasins)
        }
      );
    }
  }
}

