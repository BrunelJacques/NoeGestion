import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable,of } from 'rxjs';
import { catchError, map, tap } from 'rxjs';

import { Mouvement } from '../models/stmouvement';
import {Constantes} from "./general/constantes";

@Injectable({
  providedIn: 'root'
})
export class StsortiesService {

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  constructor(
    private http: HttpClient,
    private constantes: Constantes,
  ) {}

  getSorties(): Observable<Mouvement[]> {
    return this.http.get<Mouvement[]>(this.constantes.SORTIES_URL);
  }

}
