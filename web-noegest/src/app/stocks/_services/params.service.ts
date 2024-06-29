import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, catchError, of, tap } from 'rxjs';
import { FonctionsPerso } from '../../shared/fonctions-perso';
import { DatePipe } from '@angular/common';

import { Params,  PARAMS0, Camp, Fournisseur, Rayon, Magasin } from '../_models/params';
import { Constantes } from 'src/app/constantes';
import { Mouvement } from '../_models/mouvement';
import { HandleError } from 'src/app/general/_helpers/error.interceptor';
import { FormGroup } from '@angular/forms';

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
      this.getCamps()
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

  getCamps(){
    const url = this.constantes.GEANALYTIQUE_URL+"?axe=ACTIVITES&obsolete=False"
    this.http.get<[]>(url)
      .pipe(
        catchError(this.handleError.handleError<Camp[]>('getHttp',[])),
      )
      .subscribe(
        (data) => {
          this.campsSubj$.next(data)
        }
      );
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

