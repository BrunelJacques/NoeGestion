// src/ui/Xautocomplete/fnComplete.ts
import type { Item } from '../../types/item';

const nbMinItems = 2;
const nbMaxItems = 15;

// FinalTest, Valide la saisie d'un item.nom complet, existe  respecte la contrainte "required"
export function checkIsValid(
  value: string, items: Item[], required: boolean): boolean
{
  if (!value && !required) {
    return true;
  }
  if (!required && (!items || items.length === 0)) {
    return false;
  }
  if (required && !value) {
    return true;
  }
  const test1 = items.some(item => item.nom.toLowerCase() === value.toLowerCase());
  const test2 = value === "" && !required;
  return test1 || test2;
}


// Validation des items fournis, l'un deux contient-il la value?
export const isListItemsOk = (value: string, currentItems: Item[]) => {
  const present = filterItems(value, currentItems).length > 0;
  const lg = currentItems.length;
  return lg >= nbMinItems && lg <= nbMaxItems && present;
};

// Recherche d'un item unique presentdans items identifié par son id et son nom
export function getUniqueItem(value: string, items: Item[]): Item | undefined {
  return items.find( u => String(u.id) === value) ?? items.find(u => u.nom === value);
}

// Reourne les seuls items matchant avec value identifiés par id ou partie de nom
export function filterItems(value: string, items: Item[]): Item[] {
  function _(a:string|number) : string { return  String(a).toLowerCase() }
  return items.filter( u => {
    return _(u.id) === _(value) || _(u.nom).includes(_(value));
  });
}

// Recherche par boucles pour composer un jeu d'items à afficher'
export async function getListItems(value:string, fetchItems:(query: string) => Item[] | Promise<Item[]> ) {
  const mots = value.split(/[\[\/\\ (,.]+/);
  let finalItems: Item[] = [];

  try { // sur l'ensemble de value saisie en décrémentant par la droite
    for (let i = value.length; i > 2; i--) {
      const stripValue = value.slice(0, i);
      const data = await fetchItems(stripValue);
      console.log("fetchItems", stripValue, data);
      const mappedItems = data.map((u) => ({ id: u.id, nom: u.nom }));
      const filtered = filterItems(stripValue, mappedItems);
      if (isListItemsOk(stripValue, filtered)) {
        finalItems = [...filtered];
        console.log("wItemsOk", finalItems);
        break;
      }
    }
  } catch (error) {
    console.error("Erreur lors du fetch pour la saisie :", value, error);
  } // fin try 1

  if (mots?.length > 1) { // value est fractionnable et on n'a toujours pas trouvé
    for (const mot of mots) { // Recherche boucle sur les mots
      if (!mot) continue;
      try {
        const data = await fetchItems(mot);
        const mappedItems = data.map((u) => ({ id: u.id, nom: u.nom }));
        const filtered = filterItems(mot, mappedItems);

        // le mot donne des résultats qu'on cumule
        const merged = [...new Set([...finalItems, ...filtered])];
        if (isListItemsOk(value, merged)) {
          finalItems = [...merged];
        } else if ((filtered.length < finalItems.length) && isListItemsOk(value, filtered)){
          finalItems = [...filtered];
        }
      } catch (error) {
        console.error("Erreur lors du fetch pour le mot:", mot, error);
      } // fin try 2
    } // boucle terminée
  }
  if (!isListItemsOk(value, finalItems)) { // toujours pas trouvé
    const data = await fetchItems("");
    const mappedItems = data.map((u) => ({ id: u.id, nom: u.nom }));
    finalItems = [...mappedItems];
  }
  console.log("getListItems return", finalItems);
  return finalItems;
}

// Traite les items et applique l'auto-sélection
export function processItems(value: string, w_items: Item[],
                             setValue: (arg0: string) => void,
                             setListItems: (arg0: Item[]) => void,
                             setOpenList: (arg0: boolean) => void) {
  const filtered = filterItems(value, w_items);

  const uniqueItem = (filtered?.length === 1) ? filtered[0]
    : filtered ? getUniqueItem(value, filtered) : undefined ;

  if (uniqueItem?.nom && value !== uniqueItem.nom) {
    setValue(uniqueItem.nom);
    //onSelect(uniqueItem);
    if (isListItemsOk(uniqueItem.nom,w_items)) {
      console.log("processItems stLstItems finalSelection", w_items);
      setListItems(w_items);
    }
    console.log("processItems unique setOpenList close");
    setOpenList(false);
  }
}


