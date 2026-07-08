// types/mouvement.ts

import { ART0, type Article } from './article';

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
    fournisseur: number;
    ordi: string;
    saisie: string;
    transfert?: Date;
}
export type MvtPatch = null|{
    id: number;
    jour: string;
    sens: number;
    origine: string;
    IdArticle: number;
    nb_colis?: number;
    qte_mouvement: number;
    prix_unit: number;
    service?: number;
    rations?: number;
    analytique?: number;
    fournisseur?: number;
    ordi: string;
}


export const MVT0: Mouvement {
    id: 0,
    jour: "",
    sens: -1,
    origine: "",
    article: ART0
    qte_mouvement: 1,
    prix_unit: 1,
    service: 0,
    analytique: 0,
    ordi: "",
}

export type MvtsRetour = {
    count: number;
    results: Mouvement[];
}
