//src/ui/Xautocomplete/index.tsx
import { useState, useEffect, useRef, type ComponentPropsWithoutRef } from 'react';
import * as sc from '../xcommon.css';
import type { Item } from '../../ap_stocks/types/params';


interface Props extends Omit<
  ComponentPropsWithoutRef<"input">, 
  "onSelect"
> {  
  fetchItems: (query: string) => Promise<Item[]>;
  onSelect: (item: Item) => void;
  altClassName?: string;
  label?: string;
  error?: string | null;
  disabled?: boolean
}


export function Xautocomplete ({ 
    fetchItems, 
    onSelect,
    altClassName = "",
    error = null,
    ...props 
  }: Props) {

  const [query, setQuery] = useState<string>(
    typeof props.value === "string" ? props.value : ""
  );
  const [results, setResults] = useState<Item[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  // Ajout d'un verrou pour empêcher la réouverture après sélection
  const isSelecting = useRef(false);
  const inputRef = useRef<HTMLInputElement>(null)

useEffect(() => {
    const loadData = async () => {
      if (isSelecting.current) {
        isSelecting.current = false;
        return;
      }

      if (query.length > 0) {
        const data = await fetchItems(query);
        setResults(data);
        
        // On n'ouvre que si l'utilisateur est réellement en train de saisir
        if (document.activeElement === inputRef.current) {
          setIsOpen(true);
        }
      } else {
        setResults([]);
        setIsOpen(false);
      }
    };

    const timer = setTimeout(loadData, 300);
    return () => clearTimeout(timer);
  }, [query, fetchItems]); 

  const handleSelect = (item: Item) => {
    if (props.disabled) return;
    isSelecting.current = true; // On verrouille l'effet avant de changer le query
    setQuery(item.nom);
    setIsOpen(false);
    onSelect(item);
  };

  return (
    <div className={sc.wrapperV}>
      <div className={sc.wrapperH}>
        {props.label && <span className={sc.label}> {props.label} :</span>}
        <input
          {...props}
          className={[
            sc.baseInput,
            props.disabled && sc.disabledInput,
            altClassName
          ].filter(Boolean).join(" ")}
          ref={inputRef} //des refs distinctes pour éviter éffets collatéraux
          value={query}
          onChange={(e) => {
            console.log("Xautocomplete.onChange", e)
            isSelecting.current = false; // Si l'utilisateur retape, on déverrouille
            setQuery(e.target.value);
          }}
          onFocus={() => query.length > 0 && setIsOpen(true)}
          onBlur={() => {
            if (query.length > 0) {setIsOpen(false);}
          }}
        />
        
        {isOpen && results.length > 0 && (
          <ul className={`${sc.combo}`}>
            {results.map((item) => (
              <li 
                key={item.id} 
                className={sc.item}
                // Utiliser onMouseDown au lieu de onClick évite parfois des conflits de focus
                onMouseDown={() => handleSelect(item)} 
              >
                {item.nom}
              </li>
            ))}
          </ul>
        )}
      </div>
      {error && (
        <p className={sc.errorStyle}>{error}</p>
      )}
    </div>
  );
};