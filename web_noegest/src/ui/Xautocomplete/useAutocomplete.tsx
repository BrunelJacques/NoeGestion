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
  const [newValue, setNewValue] = useState<string>(initialValue);
  const divRef = useRef<HTMLDivElement>(null);

  const nbMinItems = 3;
  const nbMaxItems = 5;

  // Validation basée sur des items passés en paramètre pour éviter le piège du state obsolète
  const checkListItemsOk = (value: string, currentItems: Item[]) => {
    const present = getUniqueItem(value, currentItems);
    const lg = currentItems.length;
    return lg >= nbMinItems && lg <= nbMaxItems && !!present;
  };

  // Recherche d'un item unique presentdans items identifié par son id et son nom
  function getUniqueItem(value: string, items: Item[]): Item | undefined {
    return items.find( u => String(u.id) === value) ?? items.find(u => u.nom === value);
  }

  // Reourne les seuls items matchant avec value identifiés par id ou partie de nom
  function FilterItems(value: string, items: Item[]): Item[] | undefined {
    function _(a:string|number) : string { return  String(a).toLowerCase() }
    return items.filter( u => {
      return _(u.id) === _(value) || _(u.nom).includes(_(value));
    });
  }

  // Permet d'élargir la recherche en boucle de manière synchrone sur les données fraîches
  async function getlistItems() {
    if (checkListItemsOk(newValue, lstItems)) return;

    const mots = newValue.split(/[\[\/\\ (,.]+/);
    if (mots?.length > 0) {
      let currentItems = [...lstItems];

      for (const mot of mots) {
        if (!mot) continue;
        const data = await fetchItems(mot);
        currentItems = data.map((u) => ({ id: u.id, nom: u.nom }));

        // On met à jour le state à chaque étape
        setLstItems(currentItems);

        if (checkListItemsOk(newValue, currentItems)) {
          break;
        }
      }
    }
  }

  // Traite le résultat final et applique la logique d'auto-sélection
  function processItems(items: Item[], value: string) {
    const filtered = FilterItems(value, items);

    const uniqueItem = (filtered?.length === 1) ? filtered[0]
      : filtered ? getUniqueItem(value, filtered) : undefined ;
    if (uniqueItem?.nom && value !== uniqueItem.nom) {
        setNewValue(uniqueItem.nom);
        onSelect(uniqueItem);
        setOpenList(false);
    }
    setLstItems(filtered ?? items);
  }

  // Effet de debounce pour l'appel API principal
  useEffect(() => {
    let active = true; // Évite les Race Conditions si le composant unmount ou la query change

    const timer = setTimeout(async () => {
      try {
        const data = await fetchItems(newValue.length > 0 ? newValue : "");
        if (!active) return;

        const items = data.map((u) => ({ id: u.id, nom: u.nom }));
        processItems(items, newValue);
      } catch (error) {
        console.error("Erreur fetchItems:", error);
      }
    }, 300); // Debounce de 300ms

    return () => {
      active = false;
      clearTimeout(timer);
    };
  }, [newValue]);

  // Handlers
  const handleSelect = (item: Item) => {
    if (disabled) return;
    setNewValue(item.nom);
    setOpenList(false);
    onSelect(item);
  };

  const onChange = (e: { target: { value: string } }) => {
    const value = e.target.value;
    setNewValue(value);

    // Teste si value pointe sur un item unique, fn autocomplète
    const item = getUniqueItem(value,lstItems);
    if (item) {
      handleSelect(item); // Selection automatique
      if (openList) setOpenList(false);
    } else {
      onSelect(""); // Pas de selection automatique, géré par l grand parent
      if (!openList) setOpenList(true); // Affiche la liste si item non trouvé
    }

    if (!checkListItemsOk(newValue, lstItems)) {
      console.log("Onchange check KO!!", newValue, lstItems, checkListItemsOk(newValue, lstItems))
      getlistItems().then(() => void 0);
    } else {
      console.log("Onchange checkOK", checkListItemsOk(newValue, lstItems))
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
    if (!checkListItemsOk(newValue, lstItems)) {
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