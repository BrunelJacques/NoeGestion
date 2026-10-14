// types/mouvement.ts

import { ART0, type Article } from './article';

// Champs communs aux mouvements
export type Mouvement = {
    id: number;
    jour: string;
    sens: number;
    origine: string;
    idArticle: number;
    nb_colis?: number;
    qte_mouvement: number;
    prix_unit: number;
    service: number;
    rations?: number;
    analytique?: number;
    fournisseur?: number;
    ordi: string;
    article?: Article;
    saisie: string;
    transfert?: Date;
};

// Type Mouvement retourné par l'api
export type zzMouvement = Mouvement;

// Type MvtPatch contient les modifs apportées par saisie
export type zzMvtPatch = Mouvement;

export type MvtPatchObj = NonNullable<Mouvement>;

// Type MvtActif update de mouvement, pour affichage des modifs avant validation
export type MvtActif = Mouvement;

// Initialisation mouvement créé
export const MVT0 : Mouvement = {
    id: 0,
    jour: "",
    sens: -1,
    origine: "",
    article: ART0,
    qte_mouvement: 1,
    prix_unit: 1,
    service: 0,
    analytique: 0,
    ordi: "",
    saisie:"",
    idArticle: 0,
}

// retour d'api mouvements
export type MvtsRetour = {
    count: number;
    results: Mouvement[];
}
