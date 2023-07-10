import { Article } from './article';

export interface Mouvement {
    id: number;
    jour: string;
    sens: number;
    origine: string;
    article: Article
    nbcolis: number;
    qtemouvement: number;
    prixunit: number;
    service: number;
    nbrations: number;
    analytique: number;
    fournisseur: string;
    ordi: string;
    saisie: string;
    transfert: Date;
}

export interface DataMvts {
    count: number;
    results: Mouvement[]
}