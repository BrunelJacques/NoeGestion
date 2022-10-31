import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Constantes {
  public BASE_URL = "http://localhost:8000";
  public EFFECTIFS_URL = this.BASE_URL + '/effectifs';

  //orientation vers django ou inMemory 
  //public SORTIES_URL = this.BASE_URL + '/sorties';
  public SORTIES_URL = 'api.mvts';

}
