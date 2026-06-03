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
  onSelect: (item: Item|string) => void;
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

  const [allresults, setAllResults] = useState<Item[]>([]); // stockage tous items possibles
  const [results, setResults] = useState<Item[]>([]); // stockage des items filtrés selon la saisie
  const [openList, setOpenList] = useState(false); // contrôle de l'affichage de la liste déroulante
  const divRef = useRef<HTMLDivElement>(null); // référence du composant pour gestion focus
  const [newFocus, setNewFocus] = useState(false);

  const [query, setQuery] = useState<string>( // raducal pour filtrer les items selon la saisie
    typeof props.value === "string" ? props.value : ""
  );

  function isValid() { // validation de la saisie : doit correspondre à un item de la liste ou être vide si pas requis
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
    return test1 || test2;
  };


  useEffect(() => { // automate de recherche des items et traitements subséquents
    const loadData = async () => {

      // Condition de filtrage : si la saisie a plus de 1 caractère, on filtre.
      const search = query.length > 1 ? query : ""; //query vide = sans filtre
      const data = await fetchItems(search);
    
      const getItems = async (items: Item[], txt: string) => {
        // filtrage local sur id ou nom de l'item
        const filtered = items.filter(u => u.nom && 
          (u.nom.toLowerCase().includes(txt.toLowerCase()))
          || String(u.id).toLowerCase().includes(query.toLowerCase()) 
        );
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
          return allresults.map((u: Item) => ({
            id: u.id,
            nom: u.nom
          }));
        }
      };
      const items =  await getItems(data, search);
      setResults( items );

      if (allresults.length === 0) {
        const allitems = await fetchItems(""); // Récupère tous les items sans filtre pour le stockage local
        setAllResults(allitems); // Stocke tous les items possibles pour filtrage local        
      }

    };
    const timer = setTimeout(loadData, 300);
    return () => clearTimeout(timer);
  }, [query, fetchItems, allresults, onSelect]); 


  const handleSelect = (item: Item) => { // action select un item
    if (props.disabled) return;
    setQuery(item.nom);
    setOpenList(false); // ferme après selection
    onSelect(item);
  };


  const onChange = ((e: { target: { value: string } }) => {
    setQuery(e.target.value);
    const item = allresults.find(u => u.nom === e.target.value); 
    if (item) {
      onSelect(item); // si même saisie, on réémet l'item sélectionné 
      if (openList) setOpenList(false); // ferme la liste
      return; // si pas de changement, on ne fait rien
    } else {
        onSelect(""); 
    }
    if (!openList) setOpenList(true); // ouvre la liste
  });

// Gestion de la perte de focus globale du composant
  const handleBlur = () => {
    setOpenList(false);
    setNewFocus(false);
  }

  const handleReset = () => { // action reset Xinput pour affichage de liste
    divRef.current?.focus();
    setOpenList(true);
    setNewFocus(true);
  };

  return (
    <div 
    ref={divRef}
    onBlur={handleBlur} // onBlur global sur le div
    onFocus={(e) => {
      if (document.activeElement !== e.currentTarget) {
        setNewFocus(true);
        setOpenList(true);
      }
      console.log("Xautocomplete onFocus ", openList, newFocus)
    }} // onFocus global pour réouvrir la liste
    > 
      <Xinput
        {...props}
        value={query}
        onChange={onChange}
        onReset={handleReset}
        error={!isValid() ? `${props.label} invalide` : null}
        className={[
          sc.baseInput,
          props.disabled && sc.disabledInput,
          altClassName
        ].filter(Boolean).join(" ")}
        onClick={() => {
          if (newFocus ) {
            setOpenList(true); // Si focus via click, on ouvre la liste
            setNewFocus(false); // Reset du flag de focus
          } else {
            setOpenList(!openList); // Si déjà focus, on toggle la liste
            }
          console.log("Xautocomplete onClick ", openList, newFocus)
        }}  
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