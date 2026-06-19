//src/types/itemp.ts


// générique d'appels items
export type Item = {
  id: number|string;
  nom: string;
}

export const ITEM0: Item = { id: 0, nom: "item 0 | @ à définir" };



export type ItemStr = {
  id: string;
  nom: string;
}

export const ITEMSTR0: Item = { id: "@", nom: "item '@' à définir" };


export type ItemNum = {
  id: number;
  nom: string;
}

export const ITEMNUM0: Item = { id: 0, nom: "item 0 à définir" };
