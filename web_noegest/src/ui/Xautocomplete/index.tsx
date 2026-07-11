// src/ui/Xautocomplete/index.tsx
import { useEffect, useState, type ComponentPropsWithoutRef } from "react";
import * as sc from '../xcommon.css';
import { Xinput } from '../Xinput';
import {checkIsValid, getListItems, getUniqueItem} from './fnComplete.tsx';
import { inputAuto } from './inputAuto.tsx';
import type { Item } from "../../types/item.ts";
import { useFormValidation } from "../../contexts/FormContext.tsx";
import { choiceAuto } from "./choiceAuto.tsx";

interface XautocompleteProps extends Omit<ComponentPropsWithoutRef<"input">, "onSelect"> {
  fetchItems: (query: string) => Item[] | Promise<Item[]>; // Accepte synchrones ou asynchrones
  onSelect: (item: Item) => void;
  altClassName?: string;
  label?: string;
  error?: string | null;
  disabled?: boolean;
  showReset?: boolean;
  required?: boolean;
  type?: "text" | "number" | "tel" | "email" | "password";
}

export function Xautocomplete({ fetchItems, onSelect,  altClassName = "", error = null,
                                required = false, type="text", ...props
                              }: XautocompleteProps) {

  const [initialValue] = useState(() => typeof props.value === "string" ? props.value : String(props.value));

  // Initialisation synchrone des états
  const [value, setValue] = useState<string>(initialValue);
  const [listItems, setListItems] = useState<Item[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true); // Flag de blocage
  const [openList, setOpenList] = useState(false);
  const [newFocus, setNewFocus] = useState(false);

  // Effet 0: Récupération asynchrone au montage du composant, initialise listItems
  useEffect(() => {
    console.log("Xautocomplete useEffect 0");
    let isMounted = true; // Pour éviter les fuites de mémoire si le composant est démonté rapidement

    async function loadInitialItems() {
      try {
        const [newListItems, nomUnique] = await getListItems(initialValue, fetchItems);
        if (isMounted) {
          setListItems(nomUnique ? newListItems : []);
        }
      } catch (err) {
        console.error("Erreur lors de l'initialisation des items :", err);
      } finally {
        if (isMounted) {
          setIsLoading(false); // Le chargement est terminé, on libère le rendu
        }
      }
    }

    void loadInitialItems();

    return () => {
      isMounted = false;
    };
  }, []); // S'exécute une seule fois au montage (ou si les props clés changent)

  // Déportation des fonctions                "inputAuto"
  const {
    divRef,
    onChange,
    handleBlur,
    handleReset,
    handleClick,
    handleFocus
  } = inputAuto({
    listItems, setListItems, openList, setOpenList, newFocus, setNewFocus,
    fetchItems, onSelect, value, setValue
  });

  // Déportation des fonctions                "choiceAuto"
  const { handleSelect } = choiceAuto({
    setListItems, setOpenList, fetchItems, value, setValue
  });


  const [isTouched, setIsTouched] = useState(false);
  const validation = useFormValidation();

  const isValid = checkIsValid(value, listItems, required);
  // On n'affiche pas l'invalidité si le champ n'a pas été touché OU tenté de soumettre
  const displayError = !isValid && isTouched;

  // Effet 1 : Actualiser l'affichage de l'invalidité
  useEffect(() => {
    setIsTouched(true)
  }, [handleBlur, handleReset]); // Ajout des dépendances manquantes



  // Effet 2 : Transmission du choix de l'item au parent
  useEffect(() => {
    const uniqueItem = getUniqueItem(value, listItems);
    if (uniqueItem) {
      onSelect(uniqueItem??null);
    }

  }, [value, listItems]); // Ajout des dépendances manquantes


  // Effet 3 : Enregistrement unique auprès du validateur de formulaire
  useEffect(() => {
    // Le garde-fou "return" doit être à l'intérieur de l'effet
    if (!validation || !props.name) return;

    return validation.registerValidator(props.name, () => {
      setIsTouched(true);
      return isValid;
    });
  }, [validation, props.name, isValid ]);


  // Tri de la liste
  function sortQueryFirst(a: Item, b: Item) {
    const currentQuery = value.toLowerCase();
    const aMatches = a.nom.toLowerCase() === currentQuery;
    const bMatches = b.nom.toLowerCase() === currentQuery;

    if (aMatches && !bMatches) return -1; // 'a' passe devant
    if (!aMatches && bMatches) return 1;  // 'b' passe devant
    return 0;                             // On ne change pas l'ordre pour les autres
  }

  if (isLoading) {
    return <div>Chargement...</div>; // Attente tant que ce n'est pas chargé,
  }
  return (
    <div ref={divRef} onBlur={() => {handleBlur(); setIsTouched(true);}} onFocus={handleFocus}>
      <Xinput
        {...props}
        type={type}
        autoComplete="off" // Pour désactiver la suggestion de certains navigateurs
        value={value}
        onChange={(e) => { onChange(e); setIsTouched(false); }} // Masque l'erreur pendant la saisie
        onReset={handleReset}
        error={displayError ? `${props.label} invalide` : null}
        className={[
          sc.baseInput,
          props.disabled && sc.disabledInput,
          altClassName
        ].filter(Boolean).join(" ")}
        onClick={handleClick}
      />

      {openList && listItems.length > 0 && (
        <ul className={sc.lstAuto}>
          {[...listItems]
            .sort(sortQueryFirst)
            .map((item) => (
              <li
                key={item.id}
                className={sc.item}
                onMouseDown={() => handleSelect(item)}
              >
                {item.nom}
              </li>
            ))
          }
        </ul>
      )}

      {error && <p className={sc.errorStyle}>{error}</p>}
    </div>
  );
}