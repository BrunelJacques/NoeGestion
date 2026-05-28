//src/ap_stocks/types/formFields.ts
import type { PageOrigine } from "../stConstants";


export type FormField = {
  label: string;
  type: string; // 'text', 'number', 'date', 'select', etc.
  fieldName?: string|null; // le champ de mouvement BD ciblé
  default?: number|null;
  visible?: boolean;
  width?: number; // pour ajuster la largeur de la colonne
}


export const lstMvtFields: Record<PageOrigine, FormField[]> = {
  "sorties": [
    { label: "Article", type: "text", fieldName: "article", width: 200 },
    { label: "Qte", type: "number", fieldName: "qtemouvement", width: 100 },
    { label: "PxUn", type: "number", fieldName: "prixunitaire", width: 100 },
    { label: "Rations", type: "number", fieldName: "nbrations", width: 100 },
    { label: "Coût Un", type: "number", fieldName: null, width: 100 },
    { label: "Coût Tot", type: "number", fieldName: null, width: 100 },
    { label: "Qte Stock", type: "number", fieldName: null, width: 100 },
    { label: "Px Stock", type: "number", fieldName: null, width: 100 },
  ],
  "entrees": [
      { label: "Article", type: "text", fieldName: "article", width: 200 },
      { label: "Nb Colis", type: "number", fieldName: "nbcolis", width: 100 },
      { label: "Par Colis", type: "number", fieldName: null, default: 1, width: 100 },
      { label: "Qte Fact", type: "number", fieldName: "qtemouvement", width: 100 },
      { label: "PxUn", type: "number", fieldName: "prixunitaire", width: 100 },
      { label: "Coût Tot", type: "number", fieldName: null, width: 100 },
      { label: "Qte Stock", type: "number", fieldName: null, width: 100 },
      { label: "Px Stock", type: "number", fieldName: null, width: 100 },
    ],
  "article": [
    { label: "Date", type: "date", fieldName: "jour", width: 100 },
    { label: "Origine", type: "string", fieldName: "origine", width: 100 },
    { label: "Qte", type: "number", fieldName: "qtemouvement", width: 100 },
    { label: "PxUn", type: "number", fieldName: "prixunitaire", width: 100 },
    { label: "Rations", type: "number", fieldName: "nbrations", width: 100 },
    { label: "CoûtUn", type: "number", fieldName: null, width: 100 },
    { label: "CoûtTot", type: "number", fieldName: null, width: 100 },
    { label: "QteStock", type: "number", fieldName: null, width: 100 },
    { label: "PxStock", type: "number", fieldName: null, width: 100 },
  ],
}