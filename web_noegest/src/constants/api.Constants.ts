import { environment } from "./environment"

export const apiUrl = {
  BASE: environment.apiUrl,
  TOKEN_URL: `${environment.apiUrl}/api-auth/token/`,
  TOKENREFRESH_URL: `${environment.apiUrl}/api-auth/token/refresh/`,
  TOKENLOGOUT_URL: `${environment.apiUrl}/api-auth/token/logout/`,
  ME_URL: `${environment.apiUrl}/api-auth/me/`,
  SUSER_URL: `${environment.apiUrl}/api/suser`,
  STMOUVEMENT_URL: `${environment.apiUrl}/api/stmouvement`,
  STARTICLE_URL: `${environment.apiUrl}/api/starticle`,
  STARTICLE_NOM_URL: `${environment.apiUrl}/api/starticlenom`,
  GEANALYTIQUE_URL: `${environment.apiUrl}/api/geanalytique`,
  STFOURNISSEUR_URL: `${environment.apiUrl}/api/stfournisseur`,
  STRAYON_URL: `${environment.apiUrl}/api/strayon`,
  STMAGASIN_URL: `${environment.apiUrl}/api/stmagasin`,
  STEFFECTIF_URL: `${environment.apiUrl}/api/steffectifs`,
}

export default apiUrl