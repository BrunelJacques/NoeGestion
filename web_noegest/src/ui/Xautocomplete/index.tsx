//src/ui/Xautocomplete/index.tsx
import { useState, useEffect, useRef, type ComponentPropsWithoutRef } from 'react';
import croix from "../../assets/icons/croix.png"
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
  showReset?:boolean;
}


export function Xautocomplete ({ 
    fetchItems, 
    onSelect,
    altClassName = "",
    error = null,
    showReset = true,
    ...props 
  }: Props) {

  const [query, setQuery] = useState<string>(
    typeof props.value === "string" ? props.value : ""
  );
  const [results, setResults] = useState<Item[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  // Ajout d'un verrou pour empêcher la réouverture après sélection
  const isSelecting = useRef(false);
  const divRef = useRef<HTMLDivElement>(null);


useEffect(() => {
    console.log("effect ref",divRef.current,isOpen)
    const loadData = async () => {
      if (isSelecting.current) {
        isSelecting.current = false;
        return;
      }

      const data = await fetchItems(query);
      setResults(data);

      // cette ref est active: en train de saisir
      if (divRef.current?.contains(document.activeElement)) {
        setIsOpen(true);
      } else { // ferme les autres
        setResults([]);
        console.log("effect open",isOpen)
        if (isOpen) setIsOpen(false);
      }
    };

    const timer = setTimeout(loadData, 300);
    return () => clearTimeout(timer);
  }, [query, isOpen, fetchItems]); 

  const handleSelect = (item: Item) => {
    if (props.disabled) return;
    isSelecting.current = true; // On verrouille l'effet avant de changer le query
    setQuery(item.nom);
    setIsOpen(false);
    onSelect(item);
  };

  const handleReset = () => {
    if (props.disabled) return;
    setQuery("");
    setIsOpen(true);
  };

  return (
    <div className={sc.wrapperV} ref={divRef}>
      <div className={sc.wrapperH}>
        {props.label && <span className={sc.label}> {props.label} :</span>}
        <input
          {...props}
          className={[
            sc.baseInput,
            props.disabled && sc.disabledInput,
            altClassName
          ].filter(Boolean).join(" ")}
          value={query}
          onChange={(e) => {
            isSelecting.current = false; // Si l'utilisateur retape, on déverrouille
            setQuery(e.target.value);
          }}
          onFocus={() => !isOpen && setIsOpen(true)}
          onBlur={() => {
            if (isOpen) {setIsOpen(false);}
          }}
        />
        
        {isOpen  && (
          <ul className={`${sc.combo}`} >
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
      {showReset && props.value && (
        <button
          type="button"
          className={sc.resetButton}
          onClick={handleReset}
        >
          <img title={"croix"} src={croix} />
        </button>
      )}
      {error && (
        <p className={sc.errorStyle}>{error}</p>
      )}
    </div>
  );
};