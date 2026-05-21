//src/ap_stocks/components/FiltreArticle/index.tsx

import { useCallback } from "react";
import { Xautocomplete } from "../../ui/Xautocomplete";
import apiUrl from "../../constants/api.Constants";
import type { Articles } from "../types/article";
import type { Item } from "../types/params";

interface Props {
  nom: string | null | undefined;
  updateField: (value: string) => void;
}

// paramétrage de la saisie d'article avec autocomplétion
export default function FiltreArticle({ nom, updateField }: Props) {
  const url = apiUrl.STARTICLE_NOM_URL

  // Utiliser useCallback pour figer la référence de la fonction
  const fetchArticles = useCallback(async (search: string) => {
    const response = await fetch(`${url}?nom=${search}`);
    const articles: Articles = await response.json();
    return articles.results;
  }, [url]); // Ne change que si l'URL change
    
  const handleChange = (item: Item | string | number) => {
    const value =
      typeof item === "object" && item !== null && "nom" in item
        ? (item.nom)
        : String(item);

    updateField(value);
  }

  return (
    <>
      <Xautocomplete 
        label="Article"
        name="article"
        value={nom ?? ""}
        fetchItems={fetchArticles}
        onSelect={handleChange }
      />
    </>
  );
}

