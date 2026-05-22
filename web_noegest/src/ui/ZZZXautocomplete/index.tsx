//src/ui/Xautocomplete/index.tsx
import { useState, useEffect, useRef, type ComponentPropsWithoutRef, useMemo } from 'react';
import croix from "../../assets/icons/croix.png"
import * as sc from '../xcommon.css';
import type { Item } from '../../ap_stocks/types/params';
import { Xinput } from '../Xinput';


interface Props extends Omit<
  ComponentPropsWithoutRef<"input">, 
  "onSelect"
> {  
  fetchItems: (query?: string) => Promise<Item[]>;
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

  // mise à jour targetValue si la props.value change suite à changement du parent
  const targetValue = typeof props.value === "string" ? props.value : "";

  const [query, setQuery] = useState<string>(targetValue);
  const [prevValue, setPrevValue] = useState<string>(targetValue);
  
  // pour éviter une boucle dans un useEffect
  if (targetValue !== prevValue) {
    setQuery(targetValue);
    setPrevValue(targetValue);
  }

  const [results, setResults] = useState<Item[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  // Ajout d'un verrou pour empêcher la réouverture après sélection
  const isSelecting = useRef(false);
  const divRef = useRef<HTMLDivElement>(null);


  const valid = useMemo(() => {
    // Si le champ est vide au départ, on valide
    if (!query) return true; 

    // Valide true si un des résultats affichés OU props.value
    return results.some(item => item.nom.toLowerCase() === query.toLowerCase()) || 
         (targetValue.toLowerCase() === query.toLowerCase() && targetValue !== "");
  }, [query, results, targetValue]);

  useEffect(() => {

    const loadData = async () => {
      if (isSelecting.current) {
        isSelecting.current = false;
        return;
      }

      const data = await fetchItems(query);
      setResults(data);

      // cette ref est active: en train de saisir
      if (divRef.current?.contains(document.activeElement)){
        if (data.length > 0 && !isOpen)  {
          setIsOpen(true);
        }
      } else { // ferme les autres
        setResults([]);
        if (isOpen) setIsOpen(false);
      }
    };

    const timer = setTimeout(loadData, 300);
    return () => clearTimeout(timer);
  }, [query, isOpen, fetchItems]); 

  const handleSelect = (item: Item) => { // action select un item
    if (props.disabled) return;
    isSelecting.current = true; // On verrouille l'effet avant de changer le query
    setQuery(item.nom);
    setIsOpen(false);
    onSelect(item);
  };

  const handleReset = () => { // action bouton croix
    if (props.disabled) return;
    setQuery("");
    setIsOpen(!isOpen);
    onSelect({id:0, nom:""})
  };

  const onChange = ((e: { target: { value: string } }) => {
      isSelecting.current = false; // Si l'utilisateur retape, on déverrouille
      setQuery(e.target.value);
    }
  );

  return (
    <div className={sc.wrapperV} ref={divRef}>
      <div className={sc.wrapperH}>

        <Xinput
          {...props}
          value={query}
          onChange={onChange}
          error={!valid ? `${props.label} invalide` : null}
          className={[
            sc.baseInput,
            props.disabled && sc.disabledInput,
            altClassName
          ].filter(Boolean).join(" ")}
          onClick={() => setIsOpen(!isOpen)}
          onBlur={() => {
            if (isOpen && !divRef.current?.contains(document.activeElement)) 
              {setIsOpen(false);}
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
          //onBlur={() => {if (isOpen) {setIsOpen(false);}}}
        >
          <img className={sc.small10} title={"croix"} src={croix} />
        </button>
      )}
      {error && (
        <p className={sc.errorStyle}>{error}</p>
      )}
    </div>
  );
};