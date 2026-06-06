// types/mouvement.ts

import { type Article, ARTICLE0 } from './article';

export type Mouvement = {
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
    qte_mouvement: 1,
    prix_unit: 1,
    service: 0,
    analytique: 0,
    ordi: "",
    saisie: "",
}

export type MvtsRetour = {
    count: number;
    results: Mouvement[];
}
