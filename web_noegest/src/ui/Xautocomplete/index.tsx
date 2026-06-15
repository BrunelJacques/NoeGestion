// src/ui/Xautocomplete/index.tsx
import type { ComponentPropsWithoutRef } from "react";
import * as sc from '../xcommon.css';
import { Xinput } from '../Xinput';
import { checkIsValid } from './checkIsValid.tsx';
import { useAutocomplete } from './useAutocomplete.tsx';
import type { Item } from "../../ap_stocks/types/mvtFiltres.ts";


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
}

export function Xautocomplete({
                                fetchItems,
                                onSelect,
                                altClassName = "",
                                error = null,
                                required = false,
                                ...props
                              }: XautocompleteProps) {

  const initialValue = typeof props.value === "string" ? props.value : "";

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

  const isValid = checkIsValid(query, results, required);

  return (
    <div
      ref={divRef}
      onBlur={handleBlur}
      onFocus={handleFocus}
    >
      <Xinput
        {...props}
        value={query}
        onChange={onChange}
        onReset={handleReset}
        error={!isValid ? `${props.label} invalide` : null}
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