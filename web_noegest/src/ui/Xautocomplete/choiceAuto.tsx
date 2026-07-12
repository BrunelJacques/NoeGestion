//src/ui/Xautocomplete/choiceAuto.tsx
import React, { useEffect } from 'react';
import type { Item } from '../../types/item.ts';
import {processItems} from "./fnComplete.tsx";

interface UseAutocompleteProps {
  setListItems: React.Dispatch<React.SetStateAction<Item[]>>;
  setOpenList: React.Dispatch<React.SetStateAction<boolean>>;
  fetchItems: (query: string) => Item[] | Promise<Item[]>;// comptabile sync et async
  onSelect: (item: Item) => void;
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
}

export function choiceAuto({ setListItems, setOpenList, fetchItems, onSelect,
                             value, setValue }: UseAutocompleteProps) {

  // Effect debounce pour la recherche d'items par API principal
  useEffect(() => {
    let active = true; // Évite les Race Conditions si le composant unmount ou la query change

    const timer = setTimeout(async () => {
      try {
        const data = await fetchItems(value.length > 0 ? value : "");
        if (!active) return;

        const dt_items = data.map((u) => ({ id: u.id, nom: u.nom }));
        if (dt_items.length === 0) return
        processItems(value, dt_items, setValue, onSelect, setListItems, setOpenList,);
      } catch (error) {
        console.error("Erreur fetchItems:", error);
      }
    }, 300); // Debounce de 300ms
    return () => {
      active = false;
      clearTimeout(timer);
    };
  }, [value]);

  /* -------- Handlers pour les interactions avec le composant --------------- */

  const handleSelect = (item: Item) => {
    setValue(item.nom);
    setOpenList(false);
    onSelect(item);
  };

  return {
    handleSelect,
  };
}
