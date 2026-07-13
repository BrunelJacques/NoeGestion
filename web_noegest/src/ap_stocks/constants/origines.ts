//src/ap_stocks/constants/origines.ts

export type PageOrigine = "sorties" | "entrees" | "article"

export const PageOrigineValues = {
  Sorties: "sorties",
  Entrees: "entrees",
  Article: "article",
} as const;


export interface Origine {
  id: string;
  nom: string;
}

export const  Origines: Record<PageOrigine, Origine[]>  = {
  "sorties": [
    { id:  'repas', nom: 'Repas en cuisine' },
    { id:  'camp', nom: 'Camp Extérieur' },
    { id:  'od_out', nom: 'Régularisation' },
  ],
  "entrees": [
    { id:  'achat', nom: 'Achats fournisseur' },
    { id:  'retour', nom: 'Retour de camp' },
    { id:  'od_in', nom: 'Régularisation' },
  ],
    "article": [
    { id:  'achat', nom: 'Achats fournisseur' },
    { id:  'repas', nom: 'Repas en cuisine' },
    { id:  'od_in', nom: 'Régularisation' },
    { id:  'od_out', nom: 'Régularisation' },
  ],
}
