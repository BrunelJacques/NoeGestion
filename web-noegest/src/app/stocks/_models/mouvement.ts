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
    analytique: number;
    fournisseur?: string;
    ordi: string;
    saisie: string;
    transfert?: Date;
}

export const MVT0: Mouvement =  {
    id: 0,
    jour: "",
    sens: -1,
    origine: "",
    article: ARTICLE0,
    qtemouvement: 1,
    prixunit: 1,
    service: 0,
    analytique: 0,
    ordi: "",
    saisie: "",
}

export interface MvtsRetour {
    count: number;
    results: Mouvement[];
}
