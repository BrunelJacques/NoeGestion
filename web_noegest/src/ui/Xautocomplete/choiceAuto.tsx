//src/ui/Xautocomplete/choiceAuto.tsx
import React, { useState, useEffect, useRef } from 'react';
import type { Item } from '../../types/item.ts';
import {processItems} from "./fnComplete.tsx";

interface UseAutocompleteProps {
  listItems: Item[];
  setListItems: React.Dispatch<React.SetStateAction<Item[]>>;
  openList: boolean
  setOpenList: React.Dispatch<React.SetStateAction<boolean>>;
  setNewFocus: React.Dispatch<React.SetStateAction<boolean>>;
  fetchItems: (query: string) => Item[] | Promise<Item[]>;// comptabile sync et async
  initialValue: string;
}

export function choiceAuto({ listItems, setListItems,openList, setOpenList,
                             setNewFocus, fetchItems,
                             initialValue }: UseAutocompleteProps) {
  /* ---------------- constantes de portées générale ----------------- */
  const [newValue, setNewValue] = useState<string>(initialValue);
  const divRef = useRef<HTMLDivElement>(null);


  // Effect debounce pour la recherche d'items par API principal
  useEffect(() => {
    let active = true; // Évite les Race Conditions si le composant unmount ou la query change

    const timer = setTimeout(async () => {
      try {
        const data = await fetchItems(newValue.length > 0 ? newValue : "");
        if (!active) return;

        const dt_items = data.map((u) => ({ id: u.id, nom: u.nom }));
        processItems(newValue, dt_items, setNewValue, setListItems, setOpenList,);
      } catch (error) {
        console.error("Erreur fetchItems:", error);
      }
    }, 300); // Debounce de 300ms
    return () => {
      active = false;
      clearTimeout(timer);
    };
  }, [newValue, initialValue]);

  /* -------- Handlers pour les interactions avec le composant --------------- */

  const handleSelect = (item: Item) => {
    setNewValue(item.nom);
    setOpenList(false);
  };

  const handleBlur = () => {
    console.log("handleBlur bye", newValue);
    setOpenList(false);
    setNewFocus(false);
  };

  const handleReset = () => {
    divRef.current?.focus();
    console.log("handleReset close list", newValue);
    setOpenList(false);
    setNewFocus(true);
  };


  return {
    choiceValue: newValue,
    lstItems: listItems,
    openList,
    divRef,
    handleSelect,
    handleBlur,
    handleReset,
  };
}