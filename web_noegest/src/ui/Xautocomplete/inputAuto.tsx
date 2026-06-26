//src/ui/Xautocomplete/inputAuto.tsx
import React, { useState, useEffect, useRef } from 'react';
import type { Item } from '../../types/item.ts';
import {
  getListItems,
  getUniqueItem,
  isListItemsOk,
  processItems
} from './fnComplete.tsx';

interface UseAutocompleteProps {
  // Compatibilité synchrone / asynchrone
  listItems: Item[];
  setListItems: React.Dispatch<React.SetStateAction<Item[]>>;
  openList: boolean;
  setOpenList: React.Dispatch<React.SetStateAction<boolean>>;
  newFocus: boolean;
  setNewFocus: React.Dispatch<React.SetStateAction<boolean>>;
  fetchItems: (query: string) => Item[] | Promise<Item[]>;
  onSelect: (item: Item | string) => void;
  initialValue: string;
}

export function inputAuto({listItems, setListItems,openList, setOpenList,
                            newFocus, setNewFocus,
                            fetchItems, initialValue }
                                : UseAutocompleteProps) {
  /* ---------------- constantes de portées générale ----------------- */

  const [newValue, setNewValue] = useState<string>(initialValue);
  const divRef = useRef<HTMLDivElement>(null);


  useEffect(() => {
    let active = true; // Active évite 'Race Conditions'. Ouvre une activité

    const timer = setTimeout(async () => { // debouce par différé
      try {
        const data = await fetchItems(newValue.length > 0 ? newValue : "");
        if (!active) return; // Ce n'était pas la dernière requête lancée

        const dt_items = data.map((u) => ({ id: u.id, nom: u.nom }));
        processItems(newValue, dt_items, setNewValue, setListItems, setOpenList);
      } catch (error) {
        console.error("Erreur fetchItems:", error);
      }
    }, 300); // Debounce de 300ms
    return () => {
      active = false; // Ferme les demandes en cours, attend la prochaine
      clearTimeout(timer); //annule les demandes en cours, ne retient que la nouvelle
    };
  }, [newValue, initialValue]);

  /* -------- Handlers pour les interactions avec le composant --------------- */

  const onChange = (e: { target: { value: string } }) => {
    // Teste si la saisie pointe sur un item unique, fn autocomplète
    const value = e.target.value;
    setNewValue(value);
    const item = getUniqueItem(value,listItems);
    console.log("onChange item", item);
    if (item) {// Selection automatique
      setNewValue(item.nom);
      if (openList) setOpenList(false);
    } else {
      getListItems(value, fetchItems)
      .then((newListItems) => {
        if (newListItems) {
          console.log("onChange newListItems", newListItems);
          setListItems(newListItems);
        }
      })
      .catch((error) => console.error(error));
      if (!openList) setOpenList(true);
    }
    getListItems(newValue, fetchItems).then(() => void 0);
  };

  const handleBlur = () => {
    console.log("handleBlur", newValue);
    setOpenList(false);
    setNewFocus(false);
  };

  const handleReset = () => {
    divRef.current?.focus();
    setNewFocus(true);
  };

  const handleClick = () => {
    console.log("handleClick deb",newFocus, "/",openList);
    if (newFocus) {
      console.log("handleClick new set_true");
      setOpenList(true);
      setNewFocus(false);
    } else {
      console.log("handleClick set",!openList);
      setOpenList(!openList);
    }
    if (!isListItemsOk(newValue, listItems)) {
      getListItems(newValue, fetchItems).then((newListItems) => {
        if (newListItems) {
          console.log("handleClick newListItems", newListItems);
          setListItems(newListItems);
        }
      });
    }
  };

  const handleFocus = (e: React.FocusEvent<HTMLDivElement>) => {
    if (document.activeElement !== e.currentTarget) {
      setNewFocus(true);
    } else {
      setOpenList(!openList);
    }
  };

  return {
    inputValue: newValue,
    divRef,
    onChange,
    handleBlur,
    handleReset,
    handleClick,
    handleFocus,
  };
}