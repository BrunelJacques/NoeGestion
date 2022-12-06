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

  // pour Stocks
  static LSTSERVICE = [
    { code: "tous",  libelle: "Tout service" },
    { code: "matin", libelle: "Service du matin" },
    { code: "midi", libelle: "Service de midi" },
    { code: "soir", libelle: "Service du soir" },
    { code: "5eme", libelle: "5eme repas" },
  ];

  static LSTORIGINE_SORTIES = [
    { code:  "repas", libelle: "Repas en cuisine" },
    { code:  "camp", libelle: "Camp Extérieur" },
    { code:  "od_out", libelle: "Régularisation" },
    { code:  "tout", libelle: "Toute ligne (ss filtre)" },
  ];
  static LSTORIGINE_ENTREES = [
    { code:  "achat", libelle: "Achats fournisseur" },
    { code:  "retour", libelle: "Retour de camp" },
    { code:  "od_in", libelle: "Régularisation" },
    { code:  "tout", libelle: "Toute ligne (ss filtre)" },
  ];
}
