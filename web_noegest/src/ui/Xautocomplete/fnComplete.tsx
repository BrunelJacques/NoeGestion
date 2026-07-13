// src/ui/Xautocomplete/fnComplete.ts
import type { Item } from '../../types/item';
import { standardize as _ } from '../../utils/string.ts'

const nbMinItems = 2;
const nbMaxItems = 15;

// Valide la saisie d'un item.nom complet, existe  respecte la contrainte "required"
export function checkIsValid( value: string, items: Item[], required: boolean): boolean {
  const test0 = (!value && !required && items && items.length !== 0);
  const test1 = items.some(item => item.nom.toLowerCase() === value.toLowerCase());
  const test2 = value === "" && !required;
  return test0 ||test1 || test2;
}

// Validation des items fournis, l'un deux contient-il la value?
export const isListItemsOk = (value: string, currentItems: Item[],uniqueOk=false) => {
  const present = filterItems(value, currentItems).length > 0;
  const lg = currentItems.length;
  return lg >= (uniqueOk?1:nbMinItems) && lg <= nbMaxItems && present;
};

// Recherche d'un item unique present dans items identifié par son id et son nom
export function getUniqueItem(value: string, items: Item[]): Item | undefined {
  const ssDoublons = [...new Map(items.map(item => [item.id, item])).values()];

  // Premier test sur value entière
  const listeA = filterItems(value??"", ssDoublons);
  if (listeA.length == 1) {
    return listeA[0]; // la value était présente telle quelle dans l'item.nom ou .id
  }

  // Deuxième test sur value fractionnée
  const mots = value.split(/[\[\/\\ (,.]+/);
  if (mots?.length <= 1) {
    return // value n'avait qu'un seul mot ou pas de mot
  }
  let listeB = [...ssDoublons] ;

  for (const mot of mots) { // Filtrage en boucle sur chaque mot
    listeB = filterItems(mot, listeB);
    console.log("getUniqueItem process mot:", mot,"/", mots,"/", listeB);
    if (listeB.length <= 1) break;
  }
  if (listeB.length == 1) {
    console.log("getUniqueItem success", listeB[0]);
    return listeB[0]; // la value était présente telle quelle dans l'item.nom ou .id
  }
  console.log("getUniqueItem KO", listeB.length);
}


// Retourne les items matchant value == id ou partie de nom
export function filterItems(value: string, items: Item[]): Item[] {
  return items.filter( u => {
    return _(u.id) === _(value) || _(u.nom).includes(_(value));
  });
}

// Recherche pour retourner des items contenant value et itemUnique si pointé
export async function getListItems(value:string,
                                   fetchItems:(query: string) => Item[] | Promise<Item[]>
):Promise<[Item[],  Item|undefined]> { // retourne: [listeItems, itemUnique]
  const mots = value.split(/[\[\/\\ (,.]+/);
  if (mots?.length === 0 || value.length < 1) {
    return [[], undefined ]
  }
  let finalItems: Item[] = [];
  let itemUnique: Item|undefined = undefined;

  try {
    // Première étape sur le premier mot saisi fractionné par la droite
    for (let i = mots[0].length; i > 1; i--) {
      const stripMot = mots[0].slice(0, i);
      const data = await fetchItems(stripMot);
      const mappedItems = data.map((u) => ({id: u.id, nom: u.nom}));
      finalItems = [...filterItems(stripMot, mappedItems)];
      if (isListItemsOk(stripMot, finalItems, false)) { // uniqueOk false car on veut un minimum d'items
        break;
      }
    }
    if ( finalItems.length ) {
      itemUnique = getUniqueItem(mots[0], finalItems)
    }

    // Deuxième étape: value est fractionnable car on n'a toujours pas trouvé l'unique sur mot0
    if (!itemUnique && mots?.length > 1) {
      for (const mot of mots.slice(1)) { // Recherche en boucle sur les mots suivants
        if (!mot) continue;
        const data = await fetchItems(mot);
        const mappedItems = data.map((u) => ({id: u.id, nom: u.nom}));
        const filtered = filterItems(mot, mappedItems);
        // le mot donne des résultats qu'on cumule sans doublons
        const combined = [...finalItems, ...filtered]
        const ssDoublons = [...new Map(combined.map(item => [item.id, item])).values()]; // supprime les items avec ID en doublon (garde le dernier)
        finalItems = [...ssDoublons];
        if (ssDoublons.length <= nbMaxItems) {
          break // On garde une liste avec assez d'items
        }
      } // boucle mots terminée
      itemUnique = getUniqueItem(value, finalItems)
    } // fin 2eme étape

    // 3eme étape: si nécessaire élargir la liste des items
    if ( finalItems.length < nbMinItems ||!isListItemsOk(mots[0], finalItems, true)) {
      const data = await fetchItems("");
      const mappedItems = data.map((u) => ({id: u.id, nom: u.nom}));
      finalItems = [...mappedItems];
    }
  } catch (error) {
    console.error("Erreur lors du fetch pour la saisie :", value, error);
  }
  const ssDoublons = [...new Map(finalItems.map(item => [item.id, item])).values()]; // supprime les items avec ID en doublon (garde le dernier)
  return [ssDoublons, itemUnique];
}

// Traite les items et applique l'auto-sélection
export function processItems(value: string,
                             w_items: Item[],
                             setValue: (arg0: string) => void,
                             onSelect: (arg0: Item) => void,
                             setListItems: (arg0: Item[]) => void,
                             setOpenList: (arg0: boolean) => void) {

  const filtered = filterItems(value, w_items);
  const uniqueItem = getUniqueItem(value, w_items);

  if (uniqueItem?.nom && value !== uniqueItem.nom) {
    setValue(uniqueItem.nom);
    onSelect(uniqueItem);

  }
  if (uniqueItem && isListItemsOk( uniqueItem.nom, w_items,true)) {
    setListItems(w_items);
    setOpenList(false);
  } else {
    setListItems(filtered)
  }
}
