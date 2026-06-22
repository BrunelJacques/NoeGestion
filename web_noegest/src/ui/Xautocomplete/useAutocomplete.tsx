//src/ui/Xautocomplete/useAutocomplete.tsx
import { useState, useEffect, useRef } from 'react';
import type { Item } from '../../types/item.ts';

interface UseAutocompleteProps {
  // Compatibilité synchrone / asynchrone
  fetchItems: (query: string) => Item[] | Promise<Item[]>;
  onSelect: (item: Item | string) => void;
  initialValue: string;
  disabled?: boolean;
}

export function useAutocomplete({fetchItems, onSelect, initialValue, disabled }
                                : UseAutocompleteProps) {
  /* ---------------- constantes de portées générale ----------------- */
  const [lstItems, setLstItems] = useState<Item[]>([]); // Items pour affichage
  const [openList, setOpenList] = useState(false);
  const [newFocus, setNewFocus] = useState(false);
  const [newValue, setNewValue] = useState<string>(initialValue);
  const divRef = useRef<HTMLDivElement>(null);
  const nbMinItems = 2;
  const nbMaxItems = 15;

  // Validation des items fournis, l'un deux contient-il la value?
  const isListItemsOk = (value: string, currentItems: Item[]) => {
    const present = FilterItems(value, currentItems).length > 0;
    const lg = currentItems.length;
    return lg >= nbMinItems && lg <= nbMaxItems && present;
  };

  // Recherche d'un item unique presentdans items identifié par son id et son nom
  function getUniqueItem(value: string, items: Item[]): Item | undefined {
    return items.find( u => String(u.id) === value) ?? items.find(u => u.nom === value);
  }

  // Reourne les seuls items matchant avec value identifiés par id ou partie de nom
  function FilterItems(value: string, items: Item[]): Item[] {
    function _(a:string|number) : string { return  String(a).toLowerCase() }
    return items.filter( u => {
      return _(u.id) === _(value) || _(u.nom).includes(_(value));
    });
  }

  // Recherche par boucles pour composer un jeu d'items à afficher'
  async function getlistItems() {
    console.log("getlistItems start", newValue, lstItems);
    if (isListItemsOk(newValue, lstItems)) return;

    const mots = newValue.split(/[\[\/\\ (,.]+/);
    let finalItems: Item[] = [];

    try { // sur l'ensemble de value saisie en décrémentant par la droite
      for (let i = newValue.length; i > 0; i--) {
        const stripValue = newValue.slice(0, i);
        const data = await fetchItems(stripValue);
        console.log("fetchItems", stripValue, data);
        const mappedItems = data.map((u) => ({ id: u.id, nom: u.nom }));
        const filtered = FilterItems(stripValue, mappedItems);
        if (isListItemsOk(stripValue, filtered)) {
          finalItems = [...filtered];
          console.log("finalItems", finalItems);
          break;
        }
      }
    } catch (error) {
      console.error("Erreur lors du fetch pour la saisie :", newValue, error);
    } // fin try 1

    if (!isListItemsOk(newValue, finalItems) && mots?.length > 1) {
      // value est fractionnable et on n'a toujours pas trouvé
      for (const mot of mots) { // Recherche sur les mots saisis
        if (!mot) continue;
        try {
          const data = await fetchItems(mot);
          const mappedItems = data.map((u) => ({ id: u.id, nom: u.nom }));
          const filtered = FilterItems(mot, mappedItems);

          // le mot donne des résultats qu'on cumule
          const merged = [...new Set([...finalItems, ...filtered])];
          if (isListItemsOk(newValue, merged)) {
            finalItems = [...merged];
          } else if ((filtered.length < finalItems.length) && isListItemsOk(newValue, filtered)){
            finalItems = [...filtered];
          }
        } catch (error) {
          console.error("Erreur lors du fetch pour le mot:", mot, error);
        } // fin try 2
      } // boucle terminée
    }
    if (!isListItemsOk(newValue, finalItems)) { // toujours pas trouvé
      const data = await fetchItems("");
      const mappedItems = data.map((u) => ({ id: u.id, nom: u.nom }));
      finalItems = [...mappedItems];
    }
    if (finalItems.length > 0) {
      setLstItems([...finalItems]);
      console.log("getListItems stLstItems finalItems", finalItems);
      processItems(finalItems, newValue);
    }
  }

  // Traite les items et applique l'auto-sélection
  function processItems(w_items: Item[], value: string) {
    const filtered = FilterItems(value, w_items);

    const uniqueItem = (filtered?.length === 1) ? filtered[0]
      : filtered ? getUniqueItem(value, filtered) : undefined ;

    if (uniqueItem?.nom && value !== uniqueItem.nom) {
      setNewValue(uniqueItem.nom);
      onSelect(uniqueItem);
      if (isListItemsOk(uniqueItem.nom,w_items)) {
        console.log("processItems stLstItems finalSelection", w_items);
        setLstItems(w_items);
      }
      setOpenList(false);
    }

  }

  // Effect debounce pour la recherche d'items par API principal
  useEffect(() => {
    let active = true; // Évite les Race Conditions si le composant unmount ou la query change

    const timer = setTimeout(async () => {
      try {
        const data = await fetchItems(newValue.length > 0 ? newValue : "");
        if (!active) return;

        const dt_items = data.map((u) => ({ id: u.id, nom: u.nom }));
        processItems(dt_items, newValue);
      } catch (error) {
        console.error("Erreur fetchItems:", error);
      }
    }, 300); // Debounce de 300ms
    return () => {
      active = false;
      clearTimeout(timer);
    };
  }, [newValue]);

  /* -------- Handlers pour les interactions avec le composant --------------- */

  const handleSelect = (item: Item) => {
    if (disabled) return;
    setNewValue(item.nom);
    setOpenList(false);
    onSelect(item);
  };

  const onChange = (e: { target: { value: string } }) => {
    // Teste si la saisie pointe sur un item unique, fn autocomplète
    const value = e.target.value;
    setNewValue(value);
    console.log("onChange", value);
    const item = getUniqueItem(value,lstItems);
    if (item) {
      handleSelect(item); // Selection automatique
      if (openList) setOpenList(false);
    } else {
      onSelect(""); // Pas de selection automatique, géré par l grand parent
      if (!openList) setOpenList(true); // Affiche la liste si item non trouvé
    }
    console.log("onChange2", value,lstItems,);
    if (!isListItemsOk(value, lstItems)) {
      getlistItems().then(() => void 0);
    }

  };

  const handleBlur = () => {
    setOpenList(false);
    setNewFocus(false);
  };

  const handleReset = () => {
    divRef.current?.focus();
    setOpenList(false);
    setNewFocus(true);
  };

  const handleClick = () => {
    if (newFocus) {
      setOpenList(true);
      setNewFocus(false);
    } else {
      setOpenList(!openList);
    }
    if (!isListItemsOk(newValue, lstItems)) {
      console.log("handleClick", newValue,lstItems,);
      getlistItems().then(() => void 0);
    }
  };

  const handleFocus = (e: React.FocusEvent<HTMLDivElement>) => {
    if (document.activeElement !== e.currentTarget) {
      setNewFocus(true);
      setOpenList(true);
    }
  };

  return {
    value: newValue,
    lstItems,
    openList,
    divRef,
    onChange,
    handleSelect,
    handleBlur,
    handleReset,
    handleClick,
    handleFocus,
  };
}