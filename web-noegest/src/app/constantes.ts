import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Constantes {
  //orientation vers django ou inMemory 
  //public BASE_URL = "http://localhost:8000";
  //public AUTH_API = 'http://localhost:8080/api/auth/';
  public BASE_URL = "api" 

  public USERS_URL = this.BASE_URL + '/users';
  public PARAMS_URL = this.BASE_URL + '/params';
  public EFFECTIFS_URL = this.BASE_URL + '/effectifs';
  public MVTS_URL = this.BASE_URL + '/mvts';
  public CAMPS_URL = this.BASE_URL + '/camps';
  public SORTIES_URL = this.BASE_URL + '/sorties';

}
