// src/ui/Xautocomplete/index.tsx
import { useEffect, useState, type ComponentPropsWithoutRef } from "react";
import * as sc from '../xcommon.css';
import { Xinput } from '../Xinput';
import {checkIsValid, getListItems, processItems} from './fnComplete.tsx';
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
  const [isTouched, setIsTouched] = useState(false);


  // Effet 0: Récupération asynchrone au montage du composant, initialise listItems
  useEffect(() => {
    props.label === "Origine"?console.log("Effet 0 initialisation", props.label, "start"):null
    let isMounted = true; // Pour éviter les fuites de mémoire si le composant est démonté rapidement

    async function loadInitialItems() {
      try {
        const [newListItems, itemUnique] = await getListItems(initialValue, fetchItems);

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
        if (props.label === "origine"){
          console.log("useEffect 0 end", value, listItems)
        }
      }
    }
    void loadInitialItems();
    return () => {
      isMounted = false;
    };
  }, []); // Vide car doit S'exécuter une seule fois au montage, sinon il va boucler


  // Déportation des fonctions                "inputAuto"
  const { divRef, onChange, handleBlur, handleReset, handleClick, handleFocus
  } = inputAuto({ listItems, setListItems, openList, setOpenList, newFocus,
                  setNewFocus, fetchItems, onSelect, value, setValue });

  // Déportation des fonctions                "choiceAuto"
  const { handleSelect } = choiceAuto({ setListItems, setOpenList, fetchItems,
                           onSelect, value, setValue });

  const validation = useFormValidation();

  const isValid = checkIsValid(value, listItems, required);
  // On n'affiche pas l'invalidité si le champ n'a pas été touché
  const displayError = !isValid && isTouched;


  // Effect 1 : Value alignée si initialValue est changée par le parent
  useEffect(() => {
    const ok = checkIsValid(String(props.value),listItems,required)
    setValue(String(props.value))
    props.label === "Origine"? console.log("checkIsValid Effet 1",ok,"value:", value, "/",props.value, "/",listItems):null
  }, [props.value]);


  // Effet 2 : Actualiser l'affichage de l'invalidité lors de ces évènements
  useEffect(() => {
    props.label === "Origine"?console.log("setIsTouched Effet 2", isValid, true, value, listItems):null
    setIsTouched(true)
  }, [handleBlur, handleReset]); // Ajout des dépendances manquantes


  // Effet 3 : Enregistrement unique auprès du validateur de formulaire
  useEffect(() => {
    if (!validation || !props.name) return;

    return validation.registerValidator(props.name, () => {
      setIsTouched(true);
      return isValid;
    });
  }, [validation, props.name, isValid ]);


  // Effet 4: debounce pour la recherche d'items par API principal
  useEffect(() => {
    console.log("processItems Effet 4 value:", value, "props.value:",props.value )
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
  }, [value, props.value]);


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