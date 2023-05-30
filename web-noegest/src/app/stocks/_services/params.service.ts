import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { hoursDelta, deepCopy } from '../../general/_helpers/fonctions-perso';

import { Params,  PARAMS } from '../_models/params';

@Injectable({ providedIn: 'root'})

export class ParamsService {
  public paramssubject= new Subject<Params>();
  public params = PARAMS
  private key: string = "stParams"
  dataparam$!: Observable<Params[]>;
  

  constructor() {
    if (!(localStorage.getItem(this.key))) {
      this.setParams(PARAMS)
    }
    else {
      this.params = this.getStoredParams()
    }
  }


  ngOnInit(): void {
    this.getParams()
  }

  getParams() {
    this.paramssubject.next(this.params)
  }
  
  // stockage de l'info en local & affectation subject
  setParams(item: Params) {
    localStorage.setItem(this.key, JSON.stringify(item))
    this.paramssubject.next(item)
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


}
