// types/mouvement.ts

import { type Article } from './article';
import { type  Fournisseur } from './mvtFiltres';

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
    fournisseur?: Fournisseur;
    ordi: string;
    saisie: string;
    transfert?: Date;
}
export type MvtPatch = {
    id: number;
    jour: string;
    sens: number;
    origine: string;
    article: number;
    nb_colis?: number;
    qte_mouvement: number;
    prix_unit: number;
    service?: number;
    rations?: number;
    analytique?: number;
    fournisseur?: number;
    ordi?: string;
}


export const MVT0: MvtPatch =  {
    id: 0,
    jour: "",
    sens: -1,
    origine: "",
    article: 1,
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
