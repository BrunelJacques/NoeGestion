import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable,of } from 'rxjs';
import { catchError, map, tap } from 'rxjs';

import {Effectifs} from "../models/effectifs";
import {Constantes} from "./general/constantes";

@Injectable({
  providedIn: 'root'
})
export class SteffectifsService {

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  constructor(
    private http: HttpClient,
    private constantes: Constantes,
  ) {}

  getEffectifs(): Observable<Effectifs[]> {
    return this.http.get<Effectifs[]>(this.constantes.EFFECTIFS_URL);
  }

}
