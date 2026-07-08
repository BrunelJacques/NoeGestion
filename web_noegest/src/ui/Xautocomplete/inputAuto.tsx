//src/ui/Xautocomplete/inputAuto.tsx
import React, { useState, useEffect, useRef } from 'react';
import type { Item } from '../../types/item.ts';
import {
  getListItems,
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

  // SetValue, fetchItems, setListItems en asynchrone
  const fetchAndSet = async (value:string) => {
    try {
      const [newListItems, nomUnique] = await getListItems(value, fetchItems);
      if (newListItems) setListItems(newListItems);

      const val = nomUnique? nomUnique : value; // Selection automatique
      if (newValue !== val) {
        setNewValue(val); // Mise à jour si différence
      }
      setOpenList(!nomUnique); // Pour (nomUnique? false : true
    } catch (error) {console.error( "Erreur lors de getListItems:", error )}
  }

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
    fetchAndSet(value);
  };

  const handleBlur = () => {
    setOpenList(false);
    setNewFocus(false);
  };

  const handleReset = () => {
    divRef.current?.focus();
    setNewFocus(true);
  };

  const handleClick = () => {
    if (newFocus) {
      setOpenList(true);
      setNewFocus(false);
    } else setOpenList(!openList);

    if (!isListItemsOk(newValue, listItems)) fetchAndSet(newValue)
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