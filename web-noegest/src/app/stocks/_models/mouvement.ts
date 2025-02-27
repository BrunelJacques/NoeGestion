import { Article, ARTICLE0 } from './article';

export interface Mouvement {
    id: number;
    jour: Date;
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
    saisie: Date;
    transfert?: Date;
}

export const MVT0: Mouvement =  {
    id: 0,
    jour: new Date(2000,1,1),
    sens: -1,
    origine: "",
    article: ARTICLE0,
    qtemouvement: 1,
    prixunit: 1,
    service: 0,
    analytique: 0,
    ordi: "",
    saisie: new Date(2000,1,1),
}

export interface MvtsRetour {
    count: number;
    results: Mouvement[];
}
