//src/ui/Xautocomplete/choiceAuto.tsx
import React from 'react';
import type { Item } from '../../types/item.ts';

interface UseAutocompleteProps {
  setListItems: React.Dispatch<React.SetStateAction<Item[]>>;
  setOpenList: React.Dispatch<React.SetStateAction<boolean>>;
  fetchItems: (query: string) => Item[] | Promise<Item[]>;// comptabile sync et async
  onSelect: (item: Item) => void;
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
}

export function choiceAuto({ setOpenList, onSelect, setValue }: UseAutocompleteProps) {

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
