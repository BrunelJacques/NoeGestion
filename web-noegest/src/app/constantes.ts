import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Constantes {
  public BASE_URL = "http://localhost:8000";
  public EFFECTIFS_URL = this.BASE_URL + '/effectifs';
  public SORTIES_URL = this.BASE_URL + '/sorties';
}
