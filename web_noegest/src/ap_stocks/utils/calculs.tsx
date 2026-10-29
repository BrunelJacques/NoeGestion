//src/ap_stocks/pages/Mouvements/calculs.tsx

import { round } from "../../utils/number.ts";
import type { Mouvement } from "../types/mouvement.ts";
import getUser from "../../utils/getUser.tsx";


function coutUn (mvt: Mouvement):number {
  const nbRations = mvt.rations? mvt.rations : 1
  const pxUnit = mvt.prix_unit?? 0
  return round(pxUnit / nbRations,2)
}

function coutTotal (mvt: Mouvement):number {
  const qte = ( (mvt.qte_mouvement?? 0 ) * (mvt.sens?? 0))
  const pxUnit = mvt.prix_unit?? 0
  return round(pxUnit * qte,2)
}

export const calculsMvt: Record<string, (mvt: Mouvement) => number> =  {
    coutUn: coutUn,
    coutTotal: coutTotal,
};

export function getFlagsMouvement()
  : [keyof Mouvement, Mouvement[keyof Mouvement]][] {
  const today: string = new Date().toLocaleDateString('en-CA');
  const user = getUser()

  return [
    ['saisie',today],
    ['ordi', user]
  ]
}
