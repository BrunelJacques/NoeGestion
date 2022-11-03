import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Constantes {
  //orientation vers django ou inMemory 
  //public BASE_URL = "http://localhost:8000";
  public  BASE_URL = "api" 


  public EFFECTIFS_URL = this.BASE_URL + '/effectifs';
  public MVTS_URL = this.BASE_URL + '/mvts';
  public SORTIES_URL = this.BASE_URL + 'api/sorties';

}
