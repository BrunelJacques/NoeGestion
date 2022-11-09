import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map, catchError, tap} from 'rxjs/operators';

import { environment } from '@environments/environment';
import { Params } from '../_models/params';

@Injectable({ providedIn: 'root'})

export class ParamsService {
  private paramsSubject: BehaviorSubject<Params>;
  public params: Observable<Params>;

  public get paramsValue(): Params {
     return this.paramsSubject.value;
  }

  constructor(
    private http: HttpClient
  ) {
    this.paramsSubject = new BehaviorSubject<Params>(
      JSON.parse(localStorage.getItem('params'))
      );
    this.params = this.paramsSubject.asObservable();
  }

  // stockage de l'info en local
  save(params: Params) {
    return this.http.post(`${environment.apiUrl}/stocks/params`, params);
  }


}
