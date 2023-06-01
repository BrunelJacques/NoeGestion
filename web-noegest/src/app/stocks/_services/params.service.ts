import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, catchError, of } from 'rxjs';
import { hoursDelta, deepCopy } from '../../general/_helpers/fonctions-perso';

import { Params,  PARAMS, Camp } from '../_models/params';
import { Constantes } from '@app/constantes';

@Injectable({ providedIn: 'root'})

export class ParamsService {
  public paramssubject= new Subject<Params>();
  public params = PARAMS;
  private key: string = "stParams";
  public camps: Camp[] = [];

  constructor(
    private constantes: Constantes,
    private http: HttpClient){}


  ngOnInit(): void {
    this.getListCamps()
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


  list():Observable<Camp[]>{
    return (this.http.get<Camp[]>( this.constantes.ANALYTIQUE_URL+"?axe=ACTIVITES&obsolete=False"));
  }

  getListCamps(): Camp[]{
    
    this.list().subscribe(
      camps => {
        console.log(camps)
         this.camps = camps
      }
      // the first argument is a function which runs on success
      /*
      { next: (data) => this.camps = data,
      // the second argument is a function which runs on error
      error: err => console.error(err),
      // the third argument is a function which runs on completion
      complete:() => console.log('done loading posts')
       }*/
    );
    return this.camps
  }

  getCamps():Observable<Camp[]>{
    console.log(this.constantes.ANALYTIQUE_URL+"?axe=ACTIVITES&obsolete=False")    
    return (this.http.get<Camp[]>(
      Constantes.ANALYTIQUE_URL+"?axe=ACTIVITES&obsolete=False"
    ))
    .pipe(
      catchError(this.handleError<Camp[]>('getCamps', []))
    );
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

