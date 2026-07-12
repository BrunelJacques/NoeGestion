// src/ui/Xautocomplete/index.tsx
import { useEffect, useState, type ComponentPropsWithoutRef } from "react";
import * as sc from '../xcommon.css';
import { Xinput } from '../Xinput';
import {checkIsValid, getListItems} from './fnComplete.tsx';
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
    let isMounted = true; // Pour éviter les fuites de mémoire si le composant est démonté rapidement

    async function loadInitialItems() {
      try {
        const [newListItems, itemUnique] = await getListItems(initialValue, fetchItems);
        console.log("Effet 0: lance getList initialValue", initialValue);
        if (isMounted) {
          setListItems(newListItems ? newListItems : []);
          if (itemUnique) setValue(itemUnique.nom)
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
  const { divRef, onChange, handleBlur, handleReset, handleClick, handleFocus
  } = inputAuto({ listItems, setListItems, openList, setOpenList, newFocus,
                  setNewFocus, fetchItems, onSelect, value, setValue });

  // Déportation des fonctions                "choiceAuto"
  const { handleSelect } = choiceAuto({ setListItems, setOpenList, fetchItems,
                           onSelect, value, setValue });

  const [isTouched, setIsTouched] = useState(false);
  const validation = useFormValidation();

  const isValid = checkIsValid(value, listItems, required);
  // On n'affiche pas l'invalidité si le champ n'a pas été touché
  const displayError = !isValid && isTouched;

  // Effet 1 : Actualiser l'affichage de l'invalidité lors de ces évènements
  useEffect(() => {
    setIsTouched(true)
  }, [handleBlur, handleReset]); // Ajout des dépendances manquantes

/*
  // Effet 2 : Transmission du choix de l'item au parent
  useEffect(() => {
    const uniqueItem = getUniqueItem(value, listItems);
    if (uniqueItem) {
      onSelect(uniqueItem);
    }
  }, [value, listItems]); // Ajout des dépendances manquantes
*/


  // Effet 3 : Enregistrement unique auprès du validateur de formulaire
  useEffect(() => {
    if (!validation || !props.name) return;

    return validation.registerValidator(props.name, () => {
      setIsTouched(true);
      return isValid;
    });
  }, [validation, props.name, isValid ]);

  // Tri de la liste d'items
  function sortQueryFirst(a: Item, b: Item) {
    const currentQuery = value.toLowerCase();
    const aMatches = a.nom.toLowerCase() === currentQuery;
    const bMatches = b.nom.toLowerCase() === currentQuery;

    if (aMatches && !bMatches) return -1; // 'a' passe devant
    if (!aMatches && bMatches) return 1;  // 'b' passe devant
    return 0;                             // On ne change pas l'ordre pour les autres
  }

  if (isLoading) { // Attente tant que ce n'est pas chargé,
    return <div>Chargement du composant...</div>;
  }
  return (
    <div ref={divRef} onBlur={() => {handleBlur(); setIsTouched(true);}} onFocus={handleFocus}>
      <Xinput  // Fonctions dans inputAuto
        {...props}
        type={type}
        autoComplete="off" // Pour désactiver la suggestion de certains navigateurs
        value={value}
        onChange={(e) => {
          onChange(e);          // Fonction dans inputAuto
          setIsTouched(false);  // Masque l'erreur pendant la saisie
        }}
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
                onMouseDown={() => handleSelect(item)} // Fonction dans choiceAuto
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