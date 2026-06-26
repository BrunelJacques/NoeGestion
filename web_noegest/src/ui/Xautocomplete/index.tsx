// src/ui/Xautocomplete/index.tsx
import {useEffect, useRef, useState, type ComponentPropsWithoutRef } from "react";
import * as sc from '../xcommon.css';
import { Xinput } from '../Xinput';
import {checkIsValid} from './fnComplete.tsx';
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
    choiceValue,
    lstItems,
    handleSelect,
  } = choiceAuto({listItems, setListItems,openList, setOpenList, setNewFocus,
                  fetchItems, initialValue });


  // On remonte le useState ici, juste après
  const [isTouched, setIsTouched] = useState(false);
  const validation = useFormValidation();

  //La logique est les effets
  const isValid = checkIsValid(value, lstItems, required);
  const isValidRef = useRef(isValid);

  useEffect(() => {
    setValue(choiceValue);
  }, [choiceValue]);

  useEffect(() => {
    setValue(inputValue);
  }, [inputValue, handleClick]);


  useEffect(() => {
    isValidRef.current = isValid;
  }, [isValid]);

  useEffect(() => {
    // Le garde-fou "return" doit être à l'intérieur de l'effet, pas en dehors !
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
          {[...lstItems]
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