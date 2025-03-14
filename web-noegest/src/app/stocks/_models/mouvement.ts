import { Article, ARTICLE0 } from './article';

export interface Mouvement {
    id: number;
    jour: string;
    sens: number;
    origine: string;
    article: Article;
    nb_colis?: number;
    qte_mouvement: number;
    prix_unit: number;
    service: number;
    rations?: number;
    analytique: string;
    fournisseur?: string;
    ordi: string;
    saisie: string;
    transfert?: string;
}

export const MVT0: Mouvement =  {
    id: 0,
    jour: (new Date(2000,1,1)).toISOString(),
    sens: -1,
    origine: '',
    article: ARTICLE0,
    qte_mouvement: 1,
    prix_unit: 1,
    service: 0,
    analytique: '00',
    ordi: '',
    saisie: (new Date(2000,1,1)).toISOString(),
}

export interface MvtsRetour {
    count: number;
    results: Mouvement[];
}
