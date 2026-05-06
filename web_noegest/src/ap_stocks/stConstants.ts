  // src/ap_stocks/stCconstants.ts

interface Service {
  id: number;
  code: string;
  libelle: string;
}

export enum PageOrigine {
  Sorties = "sorties",
  Entrees = "entrees",
  Article = "article",
}

interface Origine {
  code: string;
  libelle: string;
}


export const  Services: Service[] = [
    { id: 0, code: '-',  libelle: 'Non précisé 1-5' },
    { id: 1, code: 'matin', libelle: '1 Service du matin' },
    { id: 2, code: 'midi', libelle: '2 Service de midi' },
    { id: 3, code: 'soir', libelle: '3 Service du soir' },
    { id: 4, code: '5eme', libelle: '4 5eme repas' },
    { id: 5, code: 'tous', libelle: '5 Tout service' },
  ]

export const  Origines: Record<PageOrigine, Origine[]>  = {
  "sorties": [
    { code:  'repas', libelle: 'Repas en cuisine' },
    { code:  'camp', libelle: 'Camp Extérieur' },
    { code:  'od_out', libelle: 'Régularisation' },
    { code:  'tout', libelle: 'Toute ligne (ss filtre)' },
  ],
  "entrees": [
    { code:  'achat', libelle: 'Achats fournisseur' },
    { code:  'retour', libelle: 'Retour de camp' },
    { code:  'od_in', libelle: 'Régularisation' },
    { code:  'tout', libelle: 'Toute ligne (ss filtre)' },
  ],
    "article": [
    { code:  'tout', libelle: 'Toute ligne (ss filtre)' },
    { code:  'achat', libelle: 'Achats fournisseur' },
    { code:  'repas', libelle: 'Repas en cuisine' },
    { code:  'od_in', libelle: 'Régularisation' },
    { code:  'od_out', libelle: 'Régularisation' },
  ],
}
