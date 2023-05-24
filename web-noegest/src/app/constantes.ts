import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class Constantes {
  //orientation vers django ou inMemory 
  public API_URL = environment.apiUrl;
  public TOKEN_URL = this.API_URL + "/api-auth/token/"
  public TOKENREFRESH_URL = this.API_URL + "/api-auth/token/refresh/"
  public STEFFECTIF_URL = this.API_URL + '/api/steffectifs';
  public STMOUVEMENT_URL = this.API_URL + '/api/stmouvement';
  public CAMPS_URL = this.API_URL + '/api/geanalytique/?axe=ACTIVITES';

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
