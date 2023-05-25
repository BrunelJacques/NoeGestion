export interface Mouvement {
    id: number;
    jour: string;
    analytique: number;
    origine: string;
    fournisseur: string;
    article_id: number;
    nbcolis: any;
    qtemouvement: number;
    prixunit: number;
    service: number;
    nbrations: any;
    article_nom: string;
    article_rayon: string;
    article_magasin: string;
    transfert: Date;
}
