import { Article, ARTICLE0 } from './article';

export interface Mouvement {
    id: number;
    jour: string;
    sens: number;
    origine: string;
    article: Article;
    nbcolis?: number;
    qtemouvement: number;
    prixunit: number;
    service: number;
    nbrations?: number;
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
    qtemouvement: 1,
    prixunit: 1,
    service: 0,
    analytique: '00',
    ordi: '',
    saisie: (new Date(2000,1,1)).toISOString(),
}

export interface MvtsRetour {
    count: number;
    results: Mouvement[];
}
