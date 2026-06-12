//src/ap_stocks/pages/Mouvements/calculs.tsx

import { round } from "../../utils/number.ts";
import type { Mouvement } from "../types/mouvement.ts";


function coutUn (mvt: Mouvement):number {
  const nbRations = mvt.rations? mvt.rations : 1
  const pxUnit = mvt.prix_unit?? 0
  return round(pxUnit / nbRations,2)
}

function coutTotal (mvt: Mouvement):number {
  const qte = mvt.qte_mouvement?? 0
  const pxUnit = mvt.prix_unit?? 0
  return round(pxUnit * qte,2)
}

export const dicCalculs: Record<string, (mvt: Mouvement) => string | number> = {
  coutUn: coutUn,
  coutTotal: coutTotal,
};

