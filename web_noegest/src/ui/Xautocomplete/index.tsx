//src/ui/Xautocomplete/index.tsx
import { useState, useEffect } from 'react';
import * as styles from './index.css';

interface Item {
  id: string | number;
  nom: string;
}

interface Props {
  fetchItems: (query: string) => Promise<Item[]>;
  onSelect: (item: Item) => void;
  placeholder?: string;
}

export const Autocomplete = ({ fetchItems, onSelect, placeholder }: Props) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Item[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  // Ajout d'un verrou pour empêcher la réouverture après sélection
  const [isSelecting, setIsSelecting] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      // Si on est en train de sélectionner, on ne fait rien
      if (isSelecting) {
        setIsSelecting(false);
        return;
      }

      if (query.length > 0) {
        const data = await fetchItems(query);
        setResults(data);
        setIsOpen(true);
      } else {
        setResults([]);
        setIsOpen(false);
      }
    };

    const timer = setTimeout(loadData, 300);
    return () => clearTimeout(timer);
  }, [query, fetchItems]); // On ne met pas isSelecting en dépendance pour éviter les boucles

  const handleSelect = (item: Item) => {
    setIsSelecting(true); // On verrouille l'effet avant de changer le query
    setQuery(item.nom);
    setIsOpen(false);
    onSelect(item);
  };

  return (
    <div className={styles.container}>
      <input
        className={styles.input}
        type="text"
        value={query}
        onChange={(e) => {
          setIsSelecting(false); // Si l'utilisateur retape, on déverrouille
          setQuery(e.target.value);
        }}
        placeholder={placeholder}
        onFocus={() => query.length > 0 && setIsOpen(true)}
      />
      
      {isOpen && results.length > 0 && (
        <ul className={styles.dropdown}>
          {results.map((item) => (
            <li 
              key={item.id} 
              className={styles.item}
              // Utiliser onMouseDown au lieu de onClick évite parfois des conflits de focus
              onMouseDown={() => handleSelect(item)} 
            >
              {item.nom}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};