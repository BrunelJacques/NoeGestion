//src/ui/Xautocomplete/inputAuto.tsx
import React, { useRef, useCallback, useEffect } from 'react';
import { ITEM0, type Item } from '../../types/item.ts';
import { getListItems,  isListItemsOk} from './fnComplete.tsx';

interface UseAutocompleteProps {
  // Compatibilité synchrone / asynchrone
  listItems: Item[];
  setListItems: React.Dispatch<React.SetStateAction<Item[]>>;
  openList: boolean;
  setOpenList: React.Dispatch<React.SetStateAction<boolean>>;
  newFocus: boolean;
  setNewFocus: React.Dispatch<React.SetStateAction<boolean>>;
  fetchItems: (query: string) => Item[] | Promise<Item[]>;
  onSelect: (item: Item) => void;
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>
}

export function inputAuto({
  listItems, setListItems, openList, setOpenList,
  newFocus, setNewFocus, fetchItems, onSelect, value, setValue
}: UseAutocompleteProps) {

  const divRef = useRef<HTMLDivElement>(null);

  // Conserve l'ID de la dernière requête pour bloquer les réponses tardives (Race Conditions)
  const requestIdRef = useRef<number>(0);

  /* 1. Définition de la logique brute de Fetch */
  const executeFetch = useCallback(async (value: string) => {

    // On génère un identifiant unique pour CETTE requête
    const currentRequestId = ++requestIdRef.current;

    try {
      const [newListItems] = await getListItems(value, fetchItems);

      // Si une autre requête a été lancée entre-temps, on ignore ce résultat
      if (currentRequestId !== requestIdRef.current) return;

      if (newListItems.length >1) {
        setListItems(newListItems);
      }
    } catch (error) {
    }
  }, [fetchItems, setListItems, setOpenList]);

  /* 2. Création du Debounce (sans dépendance externe) */
  const debounceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // callBack d'exécution fetch, limitant l'effet rebond sur le réseau
  const fetchAndSetDebounced = useCallback((value: string) => {
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }
    debounceTimerRef.current = setTimeout(() => {
      void executeFetch(value); // Le 'void' supprime l'avertissement WebStorm
    }, 300);
  }, [executeFetch]);

  // Nettoyage si le composant est démonté pendant un timer actif
  useEffect(() => {
    return () => {
      if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current);
    };
  }, []);

  /* -------- Handlers pour les interactions avec le composant --------------- */

  const onChange = (e: { target: { value: string } }) => {
    // Teste si la saisie pointe sur un item unique, fn autocomplète
    const newValue = e.target.value;

    setValue(newValue); // On met à jour l'input immédiatement

    if (newValue) {
      fetchAndSetDebounced(newValue); // Lancement différé du fetch
    }
  };

  const handleClick = () => {
    if (newFocus) {
      setOpenList(true);
      setNewFocus(false);
    } else {
      setOpenList(!openList);
    }
    if (!isListItemsOk(value, listItems)) {
      // Au clic, action immédiate : on n'attend pas les 300ms du debounce
      if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current);
      void executeFetch(value);
    }
  };

  const handleBlur = () => {
    setOpenList(false);

    //setNewFocus(false);
  };

  const handleReset = () => {
    divRef.current?.focus();
    setNewFocus(false);
    onSelect(ITEM0);
    setValue("");
    setOpenList(false)
  };

  const handleFocus = (e: React.FocusEvent<HTMLDivElement>) => {
    if (document.activeElement !== e.currentTarget) {
      console.log("handleFocus");
      setNewFocus(true);
      }
  };

  return {
    divRef,
    onChange,
    handleBlur,
    handleReset,
    handleClick,
    handleFocus,
  };
}