// src/ui/Xautocomplete/index.tsx
import {useEffect, useRef, useState, type ComponentPropsWithoutRef } from "react";
import * as sc from '../xcommon.css';
import { Xinput } from '../Xinput';
import { checkIsValid } from './checkIsValid.tsx';
import { useAutocomplete } from './useAutocomplete.tsx';
import type { Item } from "../../types/item.ts";
import { useFormValidation } from "../../contexts/FormContext.tsx";


interface XautocompleteProps extends Omit<ComponentPropsWithoutRef<"input">, "onSelect"> {
  // On accepte Item[] pour origines ou Promise<Item[] pour les asynchrones
  fetchItems: (query: string) => Item[] | Promise<Item[]>;
  onSelect: (item: Item | string) => void;
  altClassName?: string;
  label?: string;
  error?: string | null;
  disabled?: boolean;
  showReset?: boolean;
  required?: boolean;
  allowNull?: boolean
}

export function Xautocomplete({
                                fetchItems,
                                onSelect,
                                altClassName = "",
                                error = null,
                                required = false,
                                allowNull = false,
                                ...props
                              }: XautocompleteProps) {

  const initialValue = typeof props.value === "string" ? props.value : String(props.value);

  // On récupère toute la logique du Hook personnalisé
  const {
    query,
    results,
    openList,
    divRef,
    onChange,
    handleSelect,
    handleBlur,
    handleReset,
    handleClick,
    handleFocus
  } = useAutocomplete({ fetchItems, onSelect, initialValue, disabled: props.disabled });

  // On remonte le useState ici, juste après
  const [isTouched, setIsTouched] = useState(false);
  const validation = useFormValidation();

  // 2. LA LOGIQUE ET LES EFFETS ENSUITE
  const isValid = checkIsValid(query, results, required, allowNull);
  const isValidRef = useRef(isValid);

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

  return (
    <div ref={divRef} onBlur={() => { handleBlur(); setIsTouched(true); }} onFocus={handleFocus}>
      <Xinput
        {...props}
        value={query}
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
          {results.map((item) => (
            <li
              key={item.id}
              className={sc.item}
              onMouseDown={() => handleSelect(item)}
            >
              {item.nom}
            </li>
          ))}
        </ul>
      )}

      {error && (
        <p className={sc.errorStyle}>{error}</p>
      )}
    </div>
  );
}