// src/ap_stocks/stCconstants.ts

interface Service {
  id: number;
  code: string;
  libelle: string;
}

export const  Services: Service[] = [
    { id: 0, code: '-',  libelle: '' },
    { id: 1, code: 'matin', libelle: '1 Service du matin' },
    { id: 2, code: 'midi', libelle: '2 Service de midi' },
    { id: 3, code: 'soir', libelle: '3 Service du soir' },
    { id: 4, code: '5eme', libelle: '4 5eme repas' },
    { id: 5, code: 'tous', libelle: '5 Tout service' },
  ]


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
    { id:  'tout', libelle: 'Toute ligne (ss filtre)' },
  ],
  "entrees": [
    { id:  'achat', libelle: 'Achats fournisseur' },
    { id:  'retour', libelle: 'Retour de camp' },
    { id:  'od_in', libelle: 'Régularisation' },
    { id:  'tout', libelle: 'Toute ligne (ss filtre)' },
  ],
    "article": [
    { id:  'tout', libelle: 'Toute ligne (ss filtre)' },
    { id:  'achat', libelle: 'Achats fournisseur' },
    { id:  'repas', libelle: 'Repas en cuisine' },
    { id:  'od_in', libelle: 'Régularisation' },
    { id:  'od_out', libelle: 'Régularisation' },
  ],
}
