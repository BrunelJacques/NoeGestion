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
  const [allResults, setAllResults] = useState<Item[]>([]);
  const [results, setResults] = useState<Item[]>([]);
  const [openList, setOpenList] = useState(false);
  const [newFocus, setNewFocus] = useState(false);
  const [query, setQuery] = useState<string>(initialValue);

  const divRef = useRef<HTMLDivElement>(null);

  // Recherche d'un item par son id ou son nom
  function getUniqueItem(value:string, items: Item[]):Item|undefined {
    return items.find(u => String(u.id) === value)
      ??items.find(u => u.nom === value )
  }

  // Automate de recherche
  useEffect(() => {
    const loadData = async () => {
      const search = query.length > 0 ? query : "";
      const data = await fetchItems(search);
      const getItems = async (items: Item[], txt: string) => {
        const filtered = items.filter(u =>
          (u.nom && u.nom.toLowerCase().includes(txt.toLowerCase())) ||
          String(u.id).toLowerCase().includes(query.toLowerCase())
        );
        if (filtered.length > 1) {
          const unique = getUniqueItem(search,filtered)
          if (unique) {
            handleSelect(unique);
          }
          return filtered.map((u: Item) => ({ id: u.id, nom: u.nom }));
        } else {
          // affectation onSelect automatique si item unique
          const uniqueItem = filtered[0];
          const unique = uniqueItem?.nom ?? "";
          if (uniqueItem && query !== unique) {
            setQuery(unique);
            onSelect(uniqueItem);
            setOpenList(false);
          }
          return allResults.map((u: Item) => ({ id: u.id, nom: u.nom }));
        }
      };

      const items = await getItems(data, search);
      setResults(items);

      if (data.length > 0) { // Pour la validation du champ
        setAllResults(data);
      }
    };

    const timer = setTimeout(loadData, 300);
    return () => clearTimeout(timer);
  }, [query, fetchItems, onSelect]);

  // Handlers
  const handleSelect = (item: Item) => {
    if (disabled) return;
    setQuery(item.nom);
    setOpenList(false);
    onSelect(item);
  };

  const onChange = (e: { target: { value: string } }) => {
    const value = e.target.value;
    setQuery(value);

    const unique = getUniqueItem(value,allResults);
    if (unique) {
      handleSelect(unique);
      if (openList) setOpenList(false);
      return;
    } else {
      onSelect("");
    }
    if (!openList) setOpenList(true);
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
  };

  const handleFocus = (e: React.FocusEvent<HTMLDivElement>) => {
    if (document.activeElement !== e.currentTarget) {
      setNewFocus(true);
      setOpenList(true);
    }
  };

  return {
    query,
    results,
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