import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { hoursDelta, deepCopy } from '../../general/_helpers/fonctions-perso';

import { Params,  PARAMS } from '../_models/params';

@Injectable({ providedIn: 'root'})

export class ParamsService {
  public paramssubj= new Subject<Params>();
  public key: string = "stParams";


  paramsobj(): Observable<Params> {
    return this.paramssubj.asObservable();
  }
  
  constructor() {
        if (!(localStorage.getItem(this.key))) {
          this.setParams(PARAMS)
        }
        this.getParams
      }

  // stockage de l'info en local
  setParams(item: Params) {
    localStorage.setItem(this.key, JSON.stringify(item))
    this.paramssubj.next(item)
  }

  getParams() {
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
