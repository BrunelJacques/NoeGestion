import { Article } from './article';

export interface Mouvement {
    id: number;
    jour: string;
    analytique: number;
    origine: string;
    fournisseur: string;
    article_id: number;
    article: Article
    nbcolis: number;
    qtemouvement: number;
    prixunit: number;
    service: number;
    nbrations: number;
    article_nom: string;
    article_rayon: string;
    article_magasin: string;
    transfert: Date;
}
