//src/ap_stocks/types/formFields.ts
import type { PageOrigine } from "../stConstants";
import type { Mouvement } from "./mouvement";


export type FormField = {
  label: string;
  type: string; // 'text', 'number', 'date', 'select', etc.
  fieldName?: keyof Mouvement|null; // le champ de mouvement BD ciblé
  width?: number; // pour ajuster la largeur de la colonne
  justify?: 'left' | 'center' | 'right'; // alignement du contenu
  nbDecimals?: number; // pour les champs numériques, nombre de décimales à afficher
  noDisplay?: boolean;
  default?: number | string | Date; // valeur par défaut si non liée à un champ de mouvement
}


export const lstMvtFields: Record<PageOrigine, FormField[]> = {
  "sorties": [
    { label: "Article", type: "text", fieldName: "article", width: 200, justify: 'left'},
    { label: "Qte", type: "number", fieldName: "qte_mouvement", width: 100, justify: 'right', nbDecimals: 2 },
    { label: "PxUn", type: "number", fieldName: "prix_unit", width: 100, justify: 'right', nbDecimals: 3 },
    { label: "Rations", type: "number", fieldName: "rations", width: 100, justify: 'right', nbDecimals: 0 },
    { label: "Coût Un", type: "number", fieldName: null, width: 100, justify: 'right', nbDecimals: 2 },
    { label: "Coût Tot", type: "number", fieldName: null, width: 100, justify: 'right', nbDecimals: 0 },
    { label: "Qte Stock", type: "number", fieldName: null, width: 100, justify: 'right', nbDecimals: 0 },
    { label: "Px Stock", type: "number", fieldName: null, width: 100, justify: 'right', nbDecimals: 2 },
  ],
  "entrees": [
      { label: "Article", type: "text", fieldName: "article", width: 200, justify: 'left' },
      { label: "Nb Colis", type: "number", fieldName: "nb_colis", width: 100, justify: 'right', nbDecimals: 0 },
      { label: "Par Colis", type: "number", fieldName: null, default: 1, width: 100, justify: 'right', nbDecimals: 0 },
      { label: "Qte Fact", type: "number", fieldName: "qte_mouvement", width: 100, justify: 'right', nbDecimals: 2 },
      { label: "PxUn", type: "number", fieldName: "prix_unit", width: 100, justify: 'right', nbDecimals: 3 },
      { label: "Coût Tot", type: "number", fieldName: null, width: 100, justify: 'right', nbDecimals: 2 },
      { label: "Qte Stock", type: "number", fieldName: null, width: 100, justify: 'right', nbDecimals: 0 },
      { label: "Px Stock", type: "number", fieldName: null, width: 100, justify: 'right', nbDecimals: 2 },
    ],
  "article": [
    { label: "Date", type: "date", fieldName: "jour", width: 100 },
    { label: "Origine", type: "string", fieldName: "origine", width: 100 },
    { label: "Qte", type: "number", fieldName: "qte_mouvement", width: 100, justify: 'right', nbDecimals: 2 },
    { label: "PxUn", type: "number", fieldName: "prix_unit", width: 100, justify: 'right', nbDecimals: 3 },
    { label: "Rations", type: "number", fieldName: "rations", width: 100, justify: 'right', nbDecimals: 0 },
    { label: "CoûtUn", type: "number", fieldName: null, width: 100, justify: 'right', nbDecimals: 2 },
    { label: "CoûtTot", type: "number", fieldName: null, width: 100, justify: 'right', nbDecimals: 2 },
    { label: "QteStock", type: "number", fieldName: null, width: 100, justify: 'right', nbDecimals: 0 },
    { label: "PxStock", type: "number", fieldName: null, width: 100, justify: 'right', nbDecimals: 2 },
  ],
}