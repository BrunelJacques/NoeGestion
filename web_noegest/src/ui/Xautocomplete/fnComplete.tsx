// src/ui/Xautocomplete/fnComplete.ts
import type { Item } from '../../types/item';
import { standardize as _ } from '../../utils/string.ts'

const nbMinItems = 2;
const nbMaxItems = 15;

// Valide la saisie d'un item.nom complet, existe  respecte la contrainte "required"
export function checkIsValid( value: string,
                              items: Item[],
                              required: boolean): boolean {
  const test0 = (!value && !required && items && items.length !== 0);
  const test1 = items.some(item => item.nom.toLowerCase() === value.toLowerCase());
  const test2 = value === "" && !required;
  console.log("checkIsValid", test0||test1||test2,items.length);
  return test0 ||test1 || test2;
}

// Validation des items fournis, l'un deux contient-il la value?
export const isListItemsOk = (value: string, currentItems: Item[],uniqueOk=false) => {
  const present = filterItems(value, currentItems).length > 0;
  const lg = currentItems.length;
  return lg >= (uniqueOk?1:nbMinItems) && lg <= nbMaxItems && present;
};

// Recherche d'un item unique present dans items identifié par son id et son nom
export function getUniqueItem(value: string, items: Item[],
                              altValue?:string, altItems?: Item[]): Item | undefined {
  const listeA = filterItems(value??"", items??[]);
  const duo = !value.includes(altValue??"") && !altValue?.includes(value??"");

  if ( duo && altItems) { // Deux listes de mots différents à matcher
    const listeB = filterItems(altValue??"", altItems??[]);
    const listeAIds = new Set(items.map(item => item.id));
    const intersection = listeB.filter(item => listeAIds.has(item.id));
    if (intersection.length == 1) {
      return intersection[0];
    } else return undefined;

  } else { // Qu'une seule liste et valeur
    if (listeA.length == 1) {
      return listeA[0];
    } else return undefined;
  }
}

// Retourne les seuls items matchant avec value identifiés par id ou partie de nom
export function filterItems(value: string, items: Item[]): Item[] {

  return items.filter( u => {
    return _(u.id) === _(value) || _(u.nom).includes(_(value));
  });
}

// Recherche par boucles pour composer un jeu d'items à afficher'
export async function getListItems(value:string,
                                   fetchItems:(query: string) => Item[] | Promise<Item[]>
):Promise<[Item[], string]> {
  const mots = value.split(/[\[\/\\ (,.]+/);
  if (mots?.length === 0) {
    return [[], "" ]
  }
  let finalItems: Item[] = [];
  let nomUnique: string = ""

  try { // sur le premier mot saisi fractionné par la droite jusqu'à trouver des items
    for (let i = mots[0].length; i > 1; i--) {
      const stripValue = mots[0].slice(0, i);
      const data = await fetchItems(stripValue);
      const mappedItems = data.map((u) => ({ id: u.id, nom: u.nom }));
      const filtered = filterItems(stripValue, mappedItems);
      if (isListItemsOk(stripValue, filtered, true)) {
        finalItems = [...filtered];
        break;
      }
    }
  } catch (error) {
    console.error("Erreur lors du fetch pour la saisie :", value, error);
  } // fin 

  if ( finalItems.length ) {
    const itemUnique = getUniqueItem(mots[0], finalItems)
    nomUnique = itemUnique?.nom??""
  }

  if (!nomUnique && mots?.length > 1) { // value est fractionnable et on n'a toujours pas trouvé
    for (const mot of mots.slice(1)) { // Recherche en boucle sur les mots suivants
      if (!mot) continue;
      try {
        const data = await fetchItems(mot);
        const mappedItems = data.map((u) => ({ id: u.id, nom: u.nom }));
        const filtered = filterItems(mot, mappedItems);
        const itemUnique = getUniqueItem(mots[0], finalItems, mot, filtered)
        if (itemUnique) nomUnique = itemUnique.nom
        // le mot donne des résultats qu'on cumule sans doublons
        const combined = [...finalItems, ...filtered]
        const merged = [...new Map(combined.map(item => [item.id, item])).values()];

        if (merged.length <= nbMaxItems) {
          finalItems = [...merged];
        } else if ((filtered.length < finalItems.length) && isListItemsOk(mot, finalItems)){
          finalItems = [...filtered]; // gestion de priorité de mot conservé
        }
      } catch (error) {
        console.error("Erreur lors du fetch pour le mot:", mot, error);
      } // fin try 2
    } // boucle mots terminée

    if (!isListItemsOk(mots[0], finalItems, true)) { // toujours pas trouvé
      const data = await fetchItems("");
      const mappedItems = data.map((u) => ({ id: u.id, nom: u.nom }));
      finalItems = [...mappedItems];
    }
  }
  return [finalItems, nomUnique];
}

// Traite les items et applique l'auto-sélection
export function processItems(value: string,
                             w_items: Item[],
                             setValue: (arg0: string) => void,
                             setListItems: (arg0: Item[]) => void,
                             setOpenList: (arg0: boolean) => void) {
  const filtered = filterItems(value, w_items);
  const uniqueItem = getUniqueItem(value, w_items);

  if (uniqueItem?.nom && value !== uniqueItem.nom) setValue(uniqueItem.nom);

  if (uniqueItem && isListItemsOk( uniqueItem.nom, w_items,true)) {
    setListItems(w_items);
    setOpenList(false);
  } else {
    setListItems(filtered)
  }
}


