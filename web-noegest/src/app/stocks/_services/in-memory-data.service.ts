import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    let mvts = [
    {
      id: 7879,
      jour: "2022-10-31",
      origine: "repas",
      article_id: 17,
      article: "BANANAS",
      nbUnitesVente: "1.0000",
      qteMouvement: -6.253,
      prixUnit: 1.8884,
      service: "midi",
      nbRations: "1.0000",
      nbRationsArt: "5.0000",
      qteParUniteVente: "1.0000",
      qteStock: 0,
      magasin: "Réserve",
      rayon: "Fruits",
      uniteStock: "kg",
      uniteVente: "un",
      fournisseur: "",
      fournisseurArt: "RICHARD",
      txTva: "5.5000",
      prixMoyen: "1.8884",
      analytique: "00",
      transfertCompta: ""
    },
    {
      id: 7878,
      jour: "2022-10-31",
      origine: "repas",
      article_id: 17,
      article: "BANANES du soir KG",
      nbUnitesVente: "1.0000",
      qteMouvement: "-6.0000",
      prixUnit: 1.8884,
      service: "soir",
      nbRations: "1.0000",
      nbRationsArt: "5.0000",
      qteParUniteVente: "1.0000",
      qteStock: 0,
      magasin: "Réserve",
      rayon: "Fruits",
      uniteStock: "kg",
      uniteVente: "un",
      fournisseur: "",
      fournisseurArt: "RICHARD",
      txTva: "5.5000",
      prixMoyen: "1.8884",
      analytique: "00",
      transfertCompta: ""
    },
    {
        id: 7939,
        jour: "2022-10-31",
        origine: "repas",
        article_id: 27,
        article: "BEURRE PLQ 250G PIEC",
        nbUnitesVente: "1.0000",
        qteMouvement: "-4.0000",
        prixUnit: 1.6562,
        service: "soir",
        nbRations: "1.0000",
        nbRationsArt: "20.0000",
        qteParUniteVente: "1.0000",
        qteStock: 13,
        magasin: "Réserve",
        rayon: "Frais",
        uniteStock: "Plq",
        uniteVente: "un",
        fournisseur: "",
        fournisseurArt: "TRANSGOURMET",
        txTva: "5.5000",
        prixMoyen: "1.5700",
        analytique: "00",
        transfertCompta: null
    },
    {
        id: 7957,
        jour: "2022-10-31",
        origine: "repas",
        article_id: 29,
        article: "BISC COOKIES PAQUET",
        nbUnitesVente: "1.0000",
        qteMouvement: "-3.0000",
        prixUnit: 0.3481,
        service: "soir",
        nbRations: "1.0000",
        nbRationsArt: "6.0000",
        qteParUniteVente: "1.0000",
        qteStock: 13,
        magasin: "Réserve",
        rayon: "Sucré",
        uniteStock: "Un",
        uniteVente: "un",
        fournisseur: "",
        fournisseurArt: "TRANSGOURMET",
        txTva: "5.5000",
        prixMoyen: "0.4008",
        analytique: "00",
        transfertCompta: null
    },
    {
        id: 8068,
        jour: "2022-10-31",
        origine: "repas",
        article_id: 58,
        article: "CAROTTES FRAICHES KG",
        nbUnitesVente: "1.0000",
        qteMouvement: "-5.0000",
        prixUnit: 1.3609,
        service: "soir",
        nbRations: "1.0000",
        nbRationsArt: "5.0000",
        qteParUniteVente: "1.0000",
        qteStock: 0,
        magasin: "Réserve",
        rayon: "Légumes",
        uniteStock: "",
        uniteVente: "n",
        fournisseur: "",
        fournisseurArt: "RICHARD",
        txTva: "5.5000",
        prixMoyen: "1.9939",
        analytique: "00",
        transfertCompta: null
    },
    {
        id: 8092,
        jour: "2022-10-31",
        origine: "repas",
        article_id: 62,
        article: "CEREALES DU matin",
        nbUnitesVente: "1.0000",
        qteMouvement: "-3.0000",
        prixUnit: 2.4681,
        service: "matin",
        nbRations: "1.0000",
        nbRationsArt: "20.0000",
        qteParUniteVente: "1.0000",
        qteStock: 5,
        magasin: "Réserve",
        rayon: "Féculents",
        uniteStock: "",
        uniteVente: "un",
        fournisseur: "",
        fournisseurArt: "LIDL",
        txTva: "5.5000",
        prixMoyen: "2.3000",
        analytique: "00",
        transfertCompta: null
    },
    {
        id: 8148,
        jour: "2022-10-02",
        origine: "Repas",
        article_id: 76,
        article: "CHIPS X 30GRS",
        nbUnitesVente: "1.0000",
        qteMouvement: "-30.0000",
        prixUnit: 0.1582,
        service: "",
        nbRations: "1.0000",
        nbRationsArt: "1.0000",
        qteParUniteVente: "1.0000",
        qteStock: 86,
        magasin: "Réserve",
        rayon: "Féculents",
        uniteStock: "",
        uniteVente: "un",
        fournisseur: "",
        fournisseurArt: "TRANSGOURMET",
        txTva: "5.5000",
        prixMoyen: "0.1583",
        analytique: "00",
        transfertCompta: null
    },
    {
        id: 8147,
        jour: "2022-10-02",
        origine: "repas",
        article_id: 76,
        article: "CHIPS X 30GRS",
        nbUnitesVente: "1.0000",
        qteMouvement: "-30.0000",
        prixUnit: 0.1582,
        service: "soir",
        nbRations: "1.0000",
        nbRationsArt: "1.0000",
        qteParUniteVente: "1.0000",
        qteStock: 86,
        magasin: "Réserve",
        rayon: "Féculents",
        uniteStock: "",
        uniteVente: "un",
        fournisseur: "",
        fournisseurArt: "TRANSGOURMET",
        txTva: "5.5000",
        prixMoyen: "0.1583",
        analytique: "00",
        transfertCompta: null
    },
    {
        id: 8197,
        jour: "2022-10-02",
        origine: "repas",
        article_id: 79,
        article: "CHOC/PDR NESQUIK KG",
        nbUnitesVente: "1.0000",
        qteMouvement: "-1.0000",
        prixUnit: 5.7286,
        service: "soir",
        nbRations: "1.0000",
        nbRationsArt: "20.0000",
        qteParUniteVente: "1.0000",
        qteStock: 4,
        magasin: "Réserve",
        rayon: "Sucré",
        uniteStock: "",
        uniteVente: "un",
        fournisseur: "",
        fournisseurArt: "LIDL",
        txTva: "5.5000",
        prixMoyen: "5.0000",
        analytique: "00",
        transfertCompta: null
    },
    {
        id: 8218,
        jour: "2022-10-02",
        origine: "repas",
        article_id: 96,
        article: "COMPOTE COUPELLES 100GRS",
        nbUnitesVente: "1.0000",
        qteMouvement: "-70.0000",
        prixUnit: 0.1835,
        service: "soir",
        nbRations: "1.0000",
        nbRationsArt: "1.0000",
        qteParUniteVente: "1.0000",
        qteStock: 0,
        magasin: "Réserve",
        rayon: "Sucré",
        uniteStock: "",
        uniteVente: "un",
        fournisseur: "",
        fournisseurArt: "TRANSGOURMET",
        txTva: "5.5000",
        prixMoyen: "0.1835",
        analytique: "00",
        transfertCompta: null
    },
    {
        id: 8236,
        jour: "2022-10-02",
        origine: "repas",
        article_id: 100,
        article: "CONCOMBRES PIECES",
        nbUnitesVente: "1.0000",
        qteMouvement: "-5.0000",
        prixUnit: 1.0444,
        service: "soir",
        nbRations: "1.0000",
        nbRationsArt: "20.0000",
        qteParUniteVente: "1.0000",
        qteStock: 0,
        magasin: "Réserve",
        rayon: "Légumes",
        uniteStock: "",
        uniteVente: "un",
        fournisseur: "",
        fournisseurArt: "RICHARD",
        txTva: "5.5000",
        prixMoyen: "1.5623",
        analytique: "00",
        transfertCompta: null
    },
    {
        id: 8290,
        jour: "2022-10-02",
        origine: "repas",
        article_id: 115,
        article: "CREME FR LIQU L/C 1L",
        nbUnitesVente: "1.0000",
        qteMouvement: "-1.0000",
        prixUnit: 3.4604,
        service: "soir",
        nbRations: "1.0000",
        nbRationsArt: "8.0000",
        qteParUniteVente: "1.0000",
        qteStock: 14,
        magasin: "Réserve",
        rayon: "Frais",
        uniteStock: "",
        uniteVente: "un",
        fournisseur: "",
        fournisseurArt: "TRANSGOURMET",
        txTva: "5.5000",
        prixMoyen: "3.4607",
        analytique: "00",
        transfertCompta: null
    },
    {
        id: 8323,
        jour: "2022-10-02",
        origine: "repas",
        article_id: 130,
        article: "EAU MINERALE 1L5",
        nbUnitesVente: "1.0000",
        qteMouvement: "-1.0000",
        prixUnit: 0.2131,
        service: "soir",
        nbRations: "1.0000",
        nbRationsArt: "10.0000",
        qteParUniteVente: "1.0000",
        qteStock: 37,
        magasin: "Réserve",
        rayon: "Boissons",
        uniteStock: "",
        uniteVente: "un",
        fournisseur: "",
        fournisseurArt: "LIDL",
        txTva: "5.5000",
        prixMoyen: "0.2111",
        analytique: "00",
        transfertCompta: null
    },
    {
        id: 8479,
        jour: "2022-10-02",
        origine: "repas",
        article_id: 170,
        article: "FROMAGE PORTIONS",
        nbUnitesVente: "1.0000",
        qteMouvement: "-30.0000",
        prixUnit: 0.2426,
        service: "soir",
        nbRations: "1.0000",
        nbRationsArt: "1.0000",
        qteParUniteVente: "1.0000",
        qteStock: 12,
        magasin: "Frigo",
        rayon: "Frais",
        uniteStock: "",
        uniteVente: "un",
        fournisseur: "",
        fournisseurArt: "TRANSGOURMET",
        txTva: "5.5000",
        prixMoyen: "0.2533",
        analytique: "00",
        transfertCompta: null
    },
    {
        id: 8478,
        jour: "2022-10-02",
        origine: "repas",
        article_id: 170,
        article: "FROMAGE PORTIONS",
        nbUnitesVente: "1.0000",
        qteMouvement: "-30.0000",
        prixUnit: 0.2426,
        service: "soir",
        nbRations: "1.0000",
        nbRationsArt: "1.0000",
        qteParUniteVente: "1.0000",
        qteStock: 12,
        magasin: "Frigo",
        rayon: "Frais",
        uniteStock: "",
        uniteVente: "un",
        fournisseur: "",
        fournisseurArt: "TRANSGOURMET",
        txTva: "5.5000",
        prixMoyen: "0.2533",
        analytique: "00",
        transfertCompta: null
    },
    {
        id: 8550,
        jour: "2022-10-02",
        origine: "repas",
        article_id: 186,
        article: "HUILE OLIVE 1L",
        nbUnitesVente: "1.0000",
        qteMouvement: "-1.0000",
        prixUnit: 4.2305,
        service: "midi",
        nbRations: "1.0000",
        nbRationsArt: "0.0000",
        qteParUniteVente: "1.0000",
        qteStock: 9,
        magasin: "Réserve",
        rayon: "Condiments",
        uniteStock: "",
        uniteVente: "un",
        fournisseur: "",
        fournisseurArt: "TRANSGOURMET",
        txTva: "5.5000",
        prixMoyen: "4.2300",
        analytique: "00",
        transfertCompta: null
    },
    {
        id: 8570,
        jour: "2022-10-02",
        origine: "repas",
        article_id: 187,
        article: "HUILE TOURNESOL  X 1L",
        nbUnitesVente: "1.0000",
        qteMouvement: "-1.0000",
        prixUnit: 1.7600,
        service: "midi",
        nbRations: "1.0000",
        nbRationsArt: "20.0000",
        qteParUniteVente: "1.0000",
        qteStock: 5,
        magasin: "Réserve",
        rayon: "Condiments",
        uniteStock: "",
        uniteVente: "un",
        fournisseur: "",
        fournisseurArt: "TRANSGOURMET",
        txTva: "5.5000",
        prixMoyen: "1.4880",
        analytique: "00",
        transfertCompta: null
    },
    {
        id: 8598,
        jour: "2022-10-02",
        origine: "repas",
        article_id: 189,
        article: "JAMBON BLANC X 16 TR",
        nbUnitesVente: "1.0000",
        qteMouvement: "-30.0000",
        prixUnit: 0.4958,
        service: "midi",
        nbRations: "1.0000",
        nbRationsArt: "0.5000",
        qteParUniteVente: "1.0000",
        qteStock: 0,
        magasin: "Frigo",
        rayon: "Viande",
        uniteStock: "",
        uniteVente: "un",
        fournisseur: "",
        fournisseurArt: "TRANSGOURMET",
        txTva: "5.5000",
        prixMoyen: "0.4964",
        analytique: "00",
        transfertCompta: null
    },
    {
        id: 8597,
        jour: "2022-10-02",
        origine: "repas",
        article_id: 189,
        article: "JAMBON BLANC X 16 TR",
        nbUnitesVente: "1.0000",
        qteMouvement: "-30.0000",
        prixUnit: 0.4958,
        service: "midi",
        nbRations: "1.0000",
        nbRationsArt: "0.5000",
        qteParUniteVente: "1.0000",
        qteStock: 0,
        magasin: "Frigo",
        rayon: "Viande",
        uniteStock: "",
        uniteVente: "un",
        fournisseur: "",
        fournisseurArt: "TRANSGOURMET",
        txTva: "5.5000",
        prixMoyen: "0.4964",
        analytique: "00",
        transfertCompta: null
    },
    {
        id: 8668,
        jour: "2022-10-02",
        origine: "repas",
        article_id: 202,
        article: "LAIT UHT 1L",
        nbUnitesVente: "1.0000",
        qteMouvement: "-24.0000",
        prixUnit: 0.5802,
        service: "midi",
        nbRations: "1.0000",
        nbRationsArt: "10.0000",
        qteParUniteVente: "1.0000",
        qteStock: 81,
        magasin: "Réserve",
        rayon: "Frais",
        uniteStock: "",
        uniteVente: "un",
        fournisseur: "",
        fournisseurArt: "TRANSGOURMET",
        txTva: "5.5000",
        prixMoyen: "0.5802",
        analytique: "00",
        transfertCompta: null
    },
    {
        id: 8761,
        jour: "2022-10-02",
        origine: "repas",
        article_id: 225,
        article: "MELONS CANTALOU PC",
        nbUnitesVente: "1.0000",
        qteMouvement: "-14.0000",
        prixUnit: 1.8990,
        service: "midi",
        nbRations: "1.0000",
        nbRationsArt: "5.0000",
        qteParUniteVente: "1.0000",
        qteStock: 0,
        magasin: "Réserve",
        rayon: "Légumes",
        uniteStock: "",
        uniteVente: "un",
        fournisseur: "",
        fournisseurArt: "RICHARD",
        txTva: "5.5000",
        prixMoyen: "1.0550",
        analytique: "00",
        transfertCompta: null
    },
    {
        id: 8823,
        jour: "2022-10-02",
        origine: "repas",
        article_id: 251,
        article: "NUTELLA POT KG",
        nbUnitesVente: "1.0000",
        qteMouvement: "-1.0000",
        prixUnit: 5.6970,
        service: "midi",
        nbRations: "1.0000",
        nbRationsArt: "15.0000",
        qteParUniteVente: "1.0000",
        qteStock: 2,
        magasin: "Réserve",
        rayon: "Sucré",
        uniteStock: "",
        uniteVente: "un",
        fournisseur: "",
        fournisseurArt: "TRANSGOURMET",
        txTva: "5.5000",
        prixMoyen: "5.2750",
        analytique: "00",
        transfertCompta: null
    },
    {
        id: 8851,
        jour: "2022-10-02",
        origine: "repas",
        article_id: 254,
        article: "OEUFS LIQUIDE 1LITRE",
        nbUnitesVente: "1.0000",
        qteMouvement: "-1.0000",
        prixUnit: 2.753,
        service: "midi",
        nbRations: "1.0000",
        nbRationsArt: "20.0000",
        qteParUniteVente: "1.0000",
        qteStock: 11,
        magasin: "Frigo",
        rayon: "Frais",
        uniteStock: "",
        uniteVente: "un",
        fournisseur: "",
        fournisseurArt: "TRANSGOURMET",
        txTva: "5.5000",
        prixMoyen: "2.7536",
        analytique: "00",
        transfertCompta: null
    },
    {
        id: 8911,
        jour: "2022-10-02",
        origine: "repas",
        article_id: 268,
        article: "PAINS RESTAURANTS",
        nbUnitesVente: "1.0000",
        qteMouvement: "-40.0000",
        prixUnit: 1.0550,
        service: "midi",
        nbRations: "1.0000",
        nbRationsArt: "10.0000",
        qteParUniteVente: "1.0000",
        qteStock: 0,
        magasin: "Réserve",
        rayon: "Féculents",
        uniteStock: "",
        uniteVente: "un",
        fournisseur: "",
        fournisseurArt: "BOULANGER",
        txTva: "5.5000",
        prixMoyen: "1.0966",
        analytique: "00",
        transfertCompta: null
    },
    {
        id: 8973,
        jour: "2022-10-02",
        origine: "repas",
        article_id: 279,
        article: "PECHES FRAICHES   KG",
        nbUnitesVente: "1.0000",
        qteMouvement: "-15.0000",
        prixUnit: 2.9540,
        service: "midi",
        nbRations: "1.0000",
        nbRationsArt: "10.0000",
        qteParUniteVente: "1.0000",
        qteStock: 0,
        magasin: "Réserve",
        rayon: "Fruits",
        uniteStock: "",
        uniteVente: "un",
        fournisseur: "",
        fournisseurArt: "RICHARD",
        txTva: "5.5000",
        prixMoyen: "2.9540",
        analytique: "00",
        transfertCompta: null
    },
    {
        id: 8972,
        jour: "2022-10-02",
        origine: "repas",
        article_id: 279,
        article: "PECHES FRAICHES   KG",
        nbUnitesVente: "1.0000",
        qteMouvement: "-12.0000",
        prixUnit: 2.9540,
        service: "midi",
        nbRations: "1.0000",
        nbRationsArt: "10.0000",
        qteParUniteVente: "1.0000",
        qteStock: 0,
        magasin: "Réserve",
        rayon: "Fruits",
        uniteStock: "",
        uniteVente: "un",
        fournisseur: "",
        fournisseurArt: "RICHARD",
        txTva: "5.5000",
        prixMoyen: "2.9540",
        analytique: "00",
        transfertCompta: null
    },
    {
        id: 8971,
        jour: "2022-10-02",
        origine: "repas",
        article_id: 279,
        article: "PECHES FRAICHES   KG",
        nbUnitesVente: "1.0000",
        qteMouvement: "-5.0000",
        prixUnit: 2.9540,
        service: "midi",
        nbRations: "1.0000",
        nbRationsArt: "10.0000",
        qteParUniteVente: "1.0000",
        qteStock: 0,
        magasin: "Réserve",
        rayon: "Fruits",
        uniteStock: "",
        uniteVente: "un",
        fournisseur: "",
        fournisseurArt: "RICHARD",
        txTva: "5.5000",
        prixMoyen: "2.9540",
        analytique: "00",
        transfertCompta: null
    },
    {
        id: 9012,
        jour: "2022-10-02",
        origine: "repas",
        article_id: 289,
        article: "PLAQ FEUIL CONG UNITE",
        nbUnitesVente: "1.0000",
        qteMouvement: "-3.0000",
        prixUnit: 2.6300,
        service: "midi",
        nbRations: "1.0000",
        nbRationsArt: "16.0000",
        qteParUniteVente: "1.0000",
        qteStock: 0,
        magasin: "Réserve",
        rayon: "Féculents",
        uniteStock: "",
        uniteVente: "un",
        fournisseur: "",
        fournisseurArt: "TRANSGOURMET",
        txTva: "5.5000",
        prixMoyen: "2.1910",
        analytique: "00",
        transfertCompta: null
    },
    {
        id: 9091,
        jour: "2022-10-02",
        origine: "repas",
        article_id: 321,
        article: "PRUNES FRAICHES KG",
        nbUnitesVente: "1.0000",
        qteMouvement: "-15.0000",
        prixUnit: 2.9540,
        service: "midi",
        nbRations: "1.0000",
        nbRationsArt: "5.0000",
        qteParUniteVente: "1.0000",
        qteStock: 0,
        magasin: "Réserve",
        rayon: "Fruits",
        uniteStock: "",
        uniteVente: "un",
        fournisseur: "",
        fournisseurArt: "RICHARD",
        txTva: "5.5000",
        prixMoyen: "3.1544",
        analytique: "00",
        transfertCompta: null
    },
    {
        id: 9135,
        jour: "2022-10-02",
        origine: "repas",
        article_id: 338,
        article: "RIZ LONG GR US KG",
        nbUnitesVente: "1.0000",
        qteMouvement: "-9.0000",
        prixUnit: 3.5026,
        service: "midi",
        nbRations: "1.0000",
        nbRationsArt: "16.0000",
        qteParUniteVente: "1.0000",
        qteStock: 2,
        magasin: "Réserve",
        rayon: "Féculents",
        uniteStock: "",
        uniteVente: "un",
        fournisseur: "",
        fournisseurArt: "TRANSGOURMET",
        txTva: "5.5000",
        prixMoyen: "3.5050",
        analytique: "00",
        transfertCompta: null
    },
    {
        id: 9158,
        jour: "2022-10-02",
        origine: "repas",
        article_id: 344,
        article: "SALADES DIVERSES",
        nbUnitesVente: "1.0000",
        qteMouvement: "-6.0000",
        prixUnit: 1.0444,
        service: "midi",
        nbRations: "1.0000",
        nbRationsArt: "10.0000",
        qteParUniteVente: "1.0000",
        qteStock: 0,
        magasin: "Réserve",
        rayon: "Légumes",
        uniteStock: "",
        uniteVente: "un",
        fournisseur: "",
        fournisseurArt: "RICHARD",
        txTva: "5.5000",
        prixMoyen: "1.0444",
        analytique: "00",
        transfertCompta: null
    },
    {
        id: 9157,
        jour: "2022-10-02",
        origine: "repas",
        article_id: 344,
        article: "SALADES DIVERSES",
        nbUnitesVente: "1.0000",
        qteMouvement: "-12.0000",
        prixUnit: 1.0444,
        service: "midi",
        nbRations: "1.0000",
        nbRationsArt: "10.0000",
        qteParUniteVente: "1.0000",
        qteStock: 0,
        magasin: "Réserve",
        rayon: "Légumes",
        uniteStock: "",
        uniteVente: "un",
        fournisseur: "",
        fournisseurArt: "RICHARD",
        txTva: "5.5000",
        prixMoyen: "1.0444",
        analytique: "00",
        transfertCompta: null
    },
    {
        id: 9156,
        jour: "2022-10-02",
        origine: "repas",
        article_id: 344,
        article: "SALADES DIVERSES",
        nbUnitesVente: "1.0000",
        qteMouvement: "-3.0000",
        prixUnit: 1.0444,
        service: "midi",
        nbRations: "1.0000",
        nbRationsArt: "10.0000",
        qteParUniteVente: "1.0000",
        qteStock: 0,
        magasin: "Réserve",
        rayon: "Légumes",
        uniteStock: "",
        uniteVente: "un",
        fournisseur: "",
        fournisseurArt: "RICHARD",
        txTva: "5.5000",
        prixMoyen: "1.0444",
        analytique: "00",
        transfertCompta: null
    },
    {
        id: 9208,
        jour: "2022-10-02",
        origine: "repas",
        article_id: 366,
        article: "SUCRE MORCEAUX KG",
        nbUnitesVente: "1.0000",
        qteMouvement: "-1.0000",
        prixUnit: 0.8862,
        service: "midi",
        nbRations: "1.0000",
        nbRationsArt: "30.0000",
        qteParUniteVente: "1.0000",
        qteStock: 3,
        magasin: "Réserve",
        rayon: "Sucré",
        uniteStock: "",
        uniteVente: "un",
        fournisseur: "",
        fournisseurArt: "TRANSGOURMET",
        txTva: "5.5000",
        prixMoyen: "0.8867",
        analytique: "00",
        transfertCompta: null
    },
    {
        id: 9215,
        jour: "2022-10-02",
        origine: "repas",
        article_id: 367,
        article: "SUCRE POUDRE X KG",
        nbUnitesVente: "1.0000",
        qteMouvement: "-2.0000",
        prixUnit: 0.7279,
        service: "midi",
        nbRations: "1.0000",
        nbRationsArt: "10.0000",
        qteParUniteVente: "1.0000",
        qteStock: 12,
        magasin: "Réserve",
        rayon: "Sucré",
        uniteStock: "",
        uniteVente: "un",
        fournisseur: "",
        fournisseurArt: "TRANSGOURMET",
        txTva: "5.5000",
        prixMoyen: "0.6525",
        analytique: "00",
        transfertCompta: null
    },
    {
        id: 9245,
        jour: "2022-10-02",
        origine: "repas",
        article_id: 376,
        article: "TARTE POMME 10PARTS",
        nbUnitesVente: "1.0000",
        qteMouvement: "-8.0000",
        prixUnit: 3.0067,
        service: "midi",
        nbRations: "1.0000",
        nbRationsArt: "10.0000",
        qteParUniteVente: "1.0000",
        qteStock: 3,
        magasin: "Frigo",
        rayon: "Sucré",
        uniteStock: "",
        uniteVente: "un",
        fournisseur: "",
        fournisseurArt: "TRANSGOURMET",
        txTva: "5.5000",
        prixMoyen: "3.0067",
        analytique: "00",
        transfertCompta: null
    },
    {
        id: 9278,
        jour: "2022-10-02",
        origine: "repas",
        article_id: 385,
        article: "TOMAT FARC GEL  UNITE",
        nbUnitesVente: "1.0000",
        qteMouvement: "-180.0000",
        prixUnit: 0.7477,
        service: "midi",
        nbRations: "1.0000",
        nbRationsArt: "1.0000",
        qteParUniteVente: "1.0000",
        qteStock: 72,
        magasin: "Congélateur",
        rayon: "Légumes",
        uniteStock: "",
        uniteVente: "un",
        fournisseur: "",
        fournisseurArt: "TRANSGOURMET",
        txTva: "5.5000",
        prixMoyen: "0.7385",
        analytique: "00",
        transfertCompta: null
    },
    {
        id: 9284,
        jour: "2022-10-02",
        origine: "repas",
        article_id: 387,
        article: "TOMATES FRAICHES",
        nbUnitesVente: "1.0000",
        qteMouvement: "-5.0000",
        prixUnit: 1.9516,
        service: "midi",
        nbRations: "1.0000",
        nbRationsArt: "5.0000",
        qteParUniteVente: "1.0000",
        qteStock: 0,
        magasin: "Réserve",
        rayon: "Légumes",
        uniteStock: "",
        uniteVente: "un",
        fournisseur: "",
        fournisseurArt: "RICHARD",
        txTva: "5.5000",
        prixMoyen: "2.9540",
        analytique: "00",
        transfertCompta: null
    },
    {
        id: 9336,
        jour: "2022-10-02",
        origine: "repas",
        article_id: 402,
        article: "VINAIGRE DIVERS",
        nbUnitesVente: "1.0000",
        qteMouvement: "-1.0000",
        prixUnit: 4.7369,
        service: "midi",
        nbRations: "1.0000",
        nbRationsArt: "0.0000",
        qteParUniteVente: "1.0000",
        qteStock: 10,
        magasin: "Réserve",
        rayon: "Condiments",
        uniteStock: "",
        uniteVente: "un",
        fournisseur: "",
        fournisseurArt: "TRANSGOURMET",
        txTva: "5.5000",
        prixMoyen: "3.1760",
        analytique: "00",
        transfertCompta: null
    }
    ];
    let camps = [
        {
        id: 0,
        libelle: "00 Non affecté",
        },
        {
        id: 10,
        libelle: "10 Cuisine Pasto",
        },
        {
        id: 31,
        libelle: "31 Camp Montagne",
        },
        {
        id: 22,
        libelle: "22 Camp aventure",
        },
        {
        id: 21,
        libelle: "21 Camp découverte",
        },
        {
        id: 23,
        libelle: "23 Camp corse s1",
        },
    ];
    return { mvts, camps };
  }

};

