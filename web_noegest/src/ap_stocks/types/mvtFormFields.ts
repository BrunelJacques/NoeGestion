//src/ap_stocks/types/mvtFormFields.tsx
import type { Article } from "./article";
import type { Mouvement } from "./mouvement";


export type MvtFormField = {
  label: string;
  type: string; // 'text', 'number', 'date', 'select', etc.
  calcul?: string; // nom de la fonction calcul 
  fieldName?: keyof Mouvement; // le champ de mouvement BD ciblé
  subFieldName?: keyof Article; // champ accédé par clé externe
  width?: number; // pour ajuster la largeur de la colonne
  justify?: 'left' | 'center' | 'right'; // alignement du contenu
  nbDecimals?: number; // pour les champs numériques, nombre de décimales à afficher
  noDisplay?: boolean;
  default?: number | string | Date; // valeur par défaut si non liée à un champ de mouvement
}

