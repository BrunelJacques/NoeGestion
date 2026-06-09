//src/ap_stocks/constants/origines.ts

export type PageOrigine = "sorties" | "entrees" | "article"

export const PageOrigineValues = {
  Sorties: "sorties",
  Entrees: "entrees",
  Article: "article",
} as const;


export interface Origine {
  id: string;
  libelle: string;
}

export const  Origines: Record<PageOrigine, Origine[]>  = {
  "sorties": [
    { id:  'repas', libelle: 'Repas en cuisine' },
    { id:  'camp', libelle: 'Camp Extérieur' },
    { id:  'od_out', libelle: 'Régularisation' },
  ],
  "entrees": [
    { id:  'achat', libelle: 'Achats fournisseur' },
    { id:  'retour', libelle: 'Retour de camp' },
    { id:  'od_in', libelle: 'Régularisation' },
  ],
    "article": [
    { id:  'achat', libelle: 'Achats fournisseur' },
    { id:  'repas', libelle: 'Repas en cuisine' },
    { id:  'od_in', libelle: 'Régularisation' },
    { id:  'od_out', libelle: 'Régularisation' },
  ],
}
