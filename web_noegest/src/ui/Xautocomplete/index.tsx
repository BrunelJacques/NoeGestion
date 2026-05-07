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

  // Simulation/Appel de la requête à chaque changement de saisie
  useEffect(() => {
    const loadData = async () => {
      if (query.length > 0) {
        const data = await fetchItems(query);
        setResults(data);
        setIsOpen(true);
        console.log("on ouvre!!")
      } else {
        setResults([]);
        setIsOpen(false);
      }
    };

    const timer = setTimeout(loadData, 300); // Debounce pour éviter trop de requêtes
    return () => clearTimeout(timer);
  }, [query, fetchItems]);

  const handleSelect = (item: Item) => {
    setQuery(item.nom);
    setIsOpen(false);
    console.log("on ferme!!")
    onSelect(item);
  };

  return (
    <div className={styles.container}>
      <input
        className={styles.input}
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={placeholder}
        onFocus={() => query.length > 0 && setIsOpen(true)}
      />
      
      {isOpen && results.length > 0 && (
        <ul className={styles.dropdown}>
          {results.map((item) => (
            <li 
              key={item.id} 
              className={styles.item}
              onClick={() => handleSelect(item)}
            >
              {item.nom}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};