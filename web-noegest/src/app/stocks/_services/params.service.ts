import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { hoursDelta, deepCopy } from '../../general/_helpers/fonctions-perso';

import { Params,  PARAMS } from '../_models/params';

@Injectable({ providedIn: 'root'})

export class ParamsService {
  private paramsSubject: BehaviorSubject<Params>;
  public params= new Subject<Params>();
  public paramsobs= new Observable<any>;

  public key: string = "stParams";
  //public item: Params

  public get paramsValue(): Params {
     return this.paramsSubject.value;
  }

  constructor() {
    this.paramsobs = this.params.asObservable();
  }

  // stockage de l'info en local
  setParams(item: Params) {
    localStorage.setItem(this.key, JSON.stringify(item))
  }

  getParams() {
    if (!(localStorage.getItem(this.key))){
      this.setParams(PARAMS)
    }
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


}
