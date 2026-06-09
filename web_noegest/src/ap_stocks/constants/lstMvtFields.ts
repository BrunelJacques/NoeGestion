//src/ap_stocks/constants/lstMvtFiels.ts
import type { MvtFormField } from "../types/mvtFormFields";
import type { PageOrigine } from "./origines";

export const lstMvtFields: Record<PageOrigine, MvtFormField[]> = {
  "sorties": [
    { label: "Article", type: "text", fieldName: "article", subFieldName: "nom_court",width:105, justify: 'left'},
    { label: "Qte Stock", type: "number", fieldName: "article", subFieldName: "qte_stock", width: 45, justify: 'right', nbDecimals: 0 },
    { label: "Qte", type: "number", fieldName: "qte_mouvement", width: 55, justify: 'right', nbDecimals: 2 },
    { label: "PxUn", type: "number", fieldName: "prix_unit", width: 55, justify: 'right', nbDecimals: 3 },
    { label: "Rations", type: "number", fieldName: "rations", width: 55, justify: 'right', nbDecimals: 0 },
    { label: "Coût Un", type: "number", calcul: "coutUn", width: 55, justify: 'right', nbDecimals: 2 },
    { label: "Coût Tot", type: "number", calcul: "coutTotal", width: 55, justify: 'right', nbDecimals: 0 },
    { label: "Px Stock", type: "number", fieldName: "article", subFieldName: "prix_moyen", width: 55, justify: 'right', nbDecimals: 2 },
  ],
  "entrees": [
      { label: "Article", type: "text", fieldName: "article", width:105, justify: 'left' },
      { label: "Nb Colis", type: "number", fieldName: "nb_colis", width: 55, justify: 'right', nbDecimals: 0 },
      { label: "Par Colis", type: "number", fieldName: null, default: 1, width: 55, justify: 'right', nbDecimals: 0 },
      { label: "Qte Fact", type: "number", fieldName: "qte_mouvement", width: 55, justify: 'right', nbDecimals: 2 },
      { label: "PxUn", type: "number", fieldName: "prix_unit", width: 55, justify: 'right', nbDecimals: 3 },
      { label: "Coût Tot", type: "number", fieldName: null, width: 55, justify: 'right', nbDecimals: 2 },
      { label: "Qte Stock", type: "number", fieldName: null, width: 55, justify: 'right', nbDecimals: 0 },
      { label: "Px Stock", type: "number", fieldName: null, width: 55, justify: 'right', nbDecimals: 2 },
    ],
  "article": [
    { label: "Date", type: "date", fieldName: "jour", width: 55 },
    { label: "Origine", type: "string", fieldName: "origine", width: 55 },
    { label: "Qte", type: "number", fieldName: "qte_mouvement", width: 55, justify: 'right', nbDecimals: 2 },
    { label: "PxUn", type: "number", fieldName: "prix_unit", width: 55, justify: 'right', nbDecimals: 3 },
    { label: "Rations", type: "number", fieldName: "rations", width: 55, justify: 'right', nbDecimals: 0 },
    { label: "CoûtUn", type: "number", fieldName: null, width: 55, justify: 'right', nbDecimals: 2 },
    { label: "CoûtTot", type: "number", fieldName: null, width: 55, justify: 'right', nbDecimals: 2 },
    { label: "QteStock", type: "number", fieldName: null, width: 55, justify: 'right', nbDecimals: 0 },
    { label: "PxStock", type: "number", fieldName: null, width: 55, justify: 'right', nbDecimals: 2 },
  ],
}