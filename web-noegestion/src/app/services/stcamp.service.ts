import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable,of } from 'rxjs';
import { catchError, map, tap } from 'rxjs';

import { Camp } from '../models/stcamps';

@Injectable({
  providedIn: 'root'
})
export class StCampServiceService {

  
  private campsUrl = 'api/camps'; // URL to web api

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  constructor(
    private http: HttpClient ) {}

  getCamps(): Observable<Camp[]> {
    //this.messageService.add('StMvtService: cherche camps');
    return this.http.get<Camp[]>(this.campsUrl);
  }
 
  /* GET camps whose name contains search term */
  searchCamps(term: string): Observable<Camp[]> {
    if (!term.trim()) {
      // if not search term, return empty mvt array.
      return of([]);
    }
    return this.http.get<Camp[]>(`${this.campsUrl}/?name=${term}`);
  }
  
}
