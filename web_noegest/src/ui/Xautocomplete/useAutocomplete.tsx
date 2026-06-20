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
  const [lstItems, setLstItems] = useState<Item[]>([]); // Items pour affichage
  const [openList, setOpenList] = useState(false);
  const [newFocus, setNewFocus] = useState(false);
  const [unique, setUnique] = useState<string>("");
  const [query, setQuery] = useState<string>(initialValue);
  const divRef = useRef<HTMLDivElement>(null);
  const nbMinItems = 3;
  const nbMaxItems = 15;

  const isListItemsOk = () => {
    const present = getUniqueItem(query,lstItems)
    const lg = lstItems.length
    return (lg >= nbMinItems && lg <= nbMaxItems && present)}

  async function getlistItems() {
    if (isListItemsOk())
      return
    // Elargissement de listItems
    const mots = query.split(/[\[\/\\ (,.]+/) // /[...seps...]+/]/ '+/' Regroupe seps consécutifs
    if (mots?.length > 0) {
      for (const mot of mots) {
        setLstItems( await getData(mot))
        if (isListItemsOk()){
          break;
        }
      }
    }
  }

  // Recherche d'un item par son id ou son nom
  function getUniqueItem(value:string, items: Item[]):Item|undefined {
    return items.find(u => String(u.id) === value)
      ??items.find(u => u.nom === value )
  }


  // Retourne lstItems et traite le résultat de fetchItems
 async function getItems(data:Item[]) {
    const items = data.map((u) => ({ id: u.id, nom: u.nom }));

    if (items.length == 1) { // affectation onSelect automatique car item unique
      const uniqueItem = items[0];
      const unique = uniqueItem?.nom ?? "";
      if (uniqueItem && query !== unique) {
        setUnique(unique);
        onSelect(uniqueItem); // Géré par le grand parent
        setOpenList(false);
      }
    } else if (items.length > 1) { // Choix possible: élargit la recherche sur id
      const unique = getUniqueItem(query,items)
      setUnique(unique?.nom?unique.nom:"")
      }
    if (unique) setQuery(unique);
    setLstItems(items);
  }

  async function getData(search:string) {
      const data = await fetchItems(query.length > 0 ? search : "");
      console.log("getData", search, data.length)
      return data
  }

  // Automate de recherche
  useEffect(() => {
    const data = getData(query)
    getItems(data)
    const timer = setTimeout(() => { getData(query)}, 300);
    return () => clearTimeout(timer);
  }, [query]);


  // Handlers pilotés pour le parent
  const handleSelect = (item: Item) => {
    if (disabled) return;
    setQuery(item.nom);
    setOpenList(false);
    onSelect(item); // Géré par le grand parent
  };

  const onChange = (e: { target: { value: string } }) => {
    const value = e.target.value;
    setQuery(value);

    // Teste si value pointe sur un item unique, fn autocomplète
    const item = getUniqueItem(value,lstItems);
    if (item) {
      handleSelect(item); // Selection automatique
      if (openList) setOpenList(false);
    } else {
      onSelect(""); // Pas de selection automatique, géré par l grand parent
      if (!openList) setOpenList(true); // Affiche la liste si item non trouvé
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
    console.log("Click", lstItems)
    if (isListItemsOk()) { // Rappeler la liste en élargissant la recherche
      getlistItems()
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
    lstItems: lstItems,
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