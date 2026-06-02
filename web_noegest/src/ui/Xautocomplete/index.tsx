//src/ui/Xautocomplete/index.tsx
import { useState, useEffect, useRef, type ComponentPropsWithoutRef } from 'react';
import * as sc from '../xcommon.css';
import type { Item } from '../../ap_stocks/types/params';
import { Xinput } from '../Xinput';


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
  required?: boolean;
}


export function Xautocomplete ({ 
    fetchItems, 
    onSelect,
    altClassName = "",
    error = null,
    required = false,
    ...props
  }: Props) {

  const [results, setResults] = useState<Item[]>([]);
  const [openList, setOpenList] = useState(false);
  const divRef = useRef<HTMLDivElement>(null);

  const [query, setQuery] = useState<string>(
    typeof props.value === "string" ? props.value : ""
  );

  function isValid() {
    // traitement pralable
    if (!query && !required) { // si pas de saisie et pas requis, on valide
      return true
    };
    if (!results || results.length === 0) {
      return false; // si pas de résultats, on invalide
    };
    // test proprement dit
    const test1 = results.some(item => item.nom.toLowerCase() === query.toLowerCase());
    const test2 =  query == "" && !required;
    return test1||test2;
  };


  useEffect(() => {
    const loadData = async () => {
      // Condition de filtrage : si la saisie a plus de 1 caractère, on filtre.
      const search = query.length > 1 ? query : ""; //query vide = sans filtre
      const data = await fetchItems(search);
    
      const getItems = async (items: Item[], txt: string) => {
        // Calcule la liste filtrée selon la saisie courante (insensible à la casse / inclusions)
        const filtered = items.filter(u => u.nom && u.nom.toLowerCase().includes(txt.toLowerCase()));

        if (filtered.length > 1) {
          return filtered.map((u: Item) => ({ id: u.id, nom: u.nom }));
        } else {
          // Si un seul item, on récupère le seul élément correspondant
          const uniqueItem = filtered[0]; 
          const unique = uniqueItem?.nom ?? "";

          // met à jour l'input.value QUE si item unique ET que l'utilisateur et saisie incomplete 
          if (uniqueItem && query !== unique) {
            setQuery(unique); // Met à jour l'input pour afficher unique item
            onSelect(uniqueItem); // Informe le parent de l'élément est sélectionné !
            setOpenList(false);   // On peut fermer la liste puisque le choix est fait
          }
          // Si pas de résultat ou 1 résultat, on affiche tout pour aider à la sélection
          const allItems = await fetchItems("");
          
          return allItems.map((u: Item) => ({
            id: u.id,
            nom: u.nom
          }));
        }
      };
      const items =  await getItems(data, search);

      setResults( items );
    };

    const timer = setTimeout(loadData, 300);
    return () => clearTimeout(timer);
  }, [query, fetchItems, onSelect]); 

  const handleSelect = (item: Item) => { // action select un item
    if (props.disabled) return;
    setQuery(item.nom);
    setOpenList(false); // ferme après selection
    onSelect(item);
  };


  const onChange = ((e: { target: { value: string } }) => {
    setQuery(e.target.value);
    const present = results.find(item => item.nom === e.target.value); 
    if (present) {
      onSelect(present); // si même saisie, on réémet l'item sélectionné 
      if (openList) setOpenList(false); // ferme la liste
      return; // si pas de changement, on ne fait rien
    }
    if (!openList) setOpenList(true); // ouvre la liste
  });

// Gestion de la perte de focus globale du composant
  const handleBlur = (e: React.FocusEvent) => {
    // nouvel élément focus (relatedTarget) est-il à l'intérieur du div
    if (divRef.current && !divRef.current.contains(e.relatedTarget as Node)) {
      setOpenList(false);
    }
  };

  return (
    <div 
    ref={divRef}
    onBlur={handleBlur} // onBlur global sur le div
    > 
      <Xinput
        {...props}
        value={query}
        onChange={onChange}
        onReset={() => setOpenList(true)}
        error={!isValid() ? `${props.label} invalide` : null}
        className={[
          sc.baseInput,
          props.disabled && sc.disabledInput,
          altClassName
        ].filter(Boolean).join(" ")}
        onFocus={() => setOpenList(true)} // S'ouvre dès qu'on focus l'input
        onClick={() => setOpenList(!openList)} // toggle au click
      />
      
      {openList  && (
        <ul className={`${sc.lstAuto}`} >
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

      {error && (
        <p className={sc.errorStyle}>{error}</p>
      )}
    </div>
  );
};