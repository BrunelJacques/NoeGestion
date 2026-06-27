// src/ui/Xautocomplete/index.tsx
import {useEffect, useRef, useState, type ComponentPropsWithoutRef } from "react";
import * as sc from '../xcommon.css';
import { Xinput } from '../Xinput';
import {checkIsValid, getUniqueItem} from './fnComplete.tsx';
import { inputAuto } from './inputAuto.tsx';
import type { Item } from "../../types/item.ts";
import { useFormValidation } from "../../contexts/FormContext.tsx";
import {choiceAuto} from "./choiceAuto.tsx";


interface XautocompleteProps extends Omit<ComponentPropsWithoutRef<"input">, "onSelect"> {
  fetchItems: (query: string) => Item[] | Promise<Item[]>; // Accepte synchrones ou asynchrones
  onSelect: (item: Item | string) => void;
  altClassName?: string;
  label?: string;
  error?: string | null;
  disabled?: boolean;
  showReset?: boolean;
  required?: boolean;
}

export function Xautocomplete({ fetchItems, onSelect,  altClassName = "", error = null,
                                required = false, ...props
                              }: XautocompleteProps) {

  const initialValue = typeof props.value === "string" ? props.value : String(props.value);
  const [value, setValue] = useState<string>(initialValue);
  const [oldValue, setOldValue] = useState<string>(initialValue);
  const [listItems, setListItems] = useState<Item[]>([]);
  const [openList, setOpenList] = useState(false);
  const [newFocus, setNewFocus] = useState(false);
  // On récupère toute la logique du Hook personnalisé
  const {
    inputValue,
    divRef,
    onChange,
    handleBlur,
    handleReset,
    handleClick,
    handleFocus
  } = inputAuto({ listItems, setListItems,openList, setOpenList,newFocus, setNewFocus,
                  fetchItems, onSelect, initialValue });

  const {
    handleSelect,
  } = choiceAuto({ setListItems, setOpenList, setNewFocus, fetchItems, value, setValue });


  // On remonte le useState ici, juste après
  const [isTouched, setIsTouched] = useState(false);
  const validation = useFormValidation();

  //La logique est les effets
  const isValid = checkIsValid(value, listItems, required);
  const isValidRef = useRef(isValid);

  useEffect(() => { // Récupération de la saisie par l'input
    setValue(inputValue);
  }, [inputValue]);

  useEffect(() => { // Transmet au parent le choix d'item
    const uniqueItem = getUniqueItem(value, listItems);
    if (uniqueItem && value !== oldValue) {
      onSelect(uniqueItem);
      setOldValue(value)
    }
  }, [value, listItems]);

  useEffect(() => { // Pour le suivi global de validité du formulaire
    isValidRef.current = isValid;
  }, [isValid]);

  useEffect(() => {
    // Le garde-fou "return" doit être à l'intérieur de l'effet
    if (!validation || !props.name) return;

    return validation.registerValidator(props.name, () => {
      setIsTouched(true);
      return isValid;
    });

  }, [validation, props.name, isValid]); // Recalculé si isValid change

  // On affiche l'erreur si le champ est invalide ET (qu'il a été touché OU qu'on a tenté de soumettre)
  const displayError = !isValid && isTouched;

  function sortQueryFirst(a:Item,b:Item) {
      const aMatches = a.nom.toLowerCase() === value.toLowerCase();
      const bMatches = b.nom.toLowerCase() === value.toLowerCase();

      if (aMatches && !bMatches) return -1; // 'a' passe devant
      if (!aMatches && bMatches) return 1;  // 'b' passe devant
      return 0;                             // On ne change pas l'ordre pour les autres
  }
  return (
    <div ref={divRef} onBlur={() => {handleBlur(); setIsTouched(true);}} onFocus={handleFocus}>
      <Xinput
        {...props}
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

      {openList && (
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

      {error && (
        <p className={sc.errorStyle}>{error}</p>
      )}
    </div>
  );
}