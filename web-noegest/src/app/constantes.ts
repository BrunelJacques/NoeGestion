import { Injectable } from '@angular/core'
import { environment } from 'src/environments/environment'

@Injectable({
  providedIn: 'root'
})
export class Constantes {
  //orientation vers django ou inMemory 
  public API_URL = environment.apiUrl
  public TOKEN_URL = this.API_URL + '/api-auth/token/'
  public TOKENREFRESH_URL = this.API_URL + '/api-auth/token/refresh/'
  public TOKENLOGOUT_URL = this.API_URL + '/api-auth/token/refresh/'
  public STMOUVEMENT_URL = this.API_URL + '/api/stmouvement'
  public STARTICLE_URL = this.API_URL + '/api/starticle/'
  public STARTICLE_NOM_URL = this.API_URL + '/api/starticle/'
  public GEANALYTIQUE_URL = this.API_URL + '/api/geanalytique/'
  public STFOURNISSEUR_URL = this.API_URL + '/api/stfournisseur/'
  public STRAYON_URL = this.API_URL + '/api/strayon/'
  public STMAGASIN_URL = this.API_URL + '/api/stmagasin/'
  public STEFFECTIF_URL = this.API_URL + '/api/steffectifs'

  // pour Stocks
  static LSTSERVICE = [
    { id: 0, code: '-',  libelle: 'Non précisé 1-5' },
    { id: 1, code: 'matin', libelle: '1 Service du matin' },
    { id: 2, code: 'midi', libelle: '2 Service de midi' },
    { id: 3, code: 'soir', libelle: '3 Service du soir' },
    { id: 4, code: '5eme', libelle: '4 5eme repas' },
    { id: 5, code: 'tous', libelle: '5 Tout service' },
  ]

  static LSTORIGINE_SORTIES = [
    { code:  'repas', libelle: 'Repas en cuisine' },
    { code:  'camp', libelle: 'Camp Extérieur' },
    { code:  'od_out', libelle: 'Régularisation' },
    { code:  'tout', libelle: 'Toute ligne (ss filtre)' },
  ]

  static LSTORIGINE_ENTREES = [
    { code:  'achat', libelle: 'Achats fournisseur' },
    { code:  'retour', libelle: 'Retour de camp' },
    { code:  'od_in', libelle: 'Régularisation' },
    { code:  'tout', libelle: 'Toute ligne (ss filtre)' },
  ]


}
