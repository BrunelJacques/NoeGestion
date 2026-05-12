//src/ap_stocks/components/FiltreArticle/index.tsx

import { Xautocomplete } from "../../ui/Xautocomplete";
import apiUrl from "../../constants/api.Constants";
import type { Article, Articles } from "../types/article";

interface Props {
  nom: string | null | undefined;
  updateField: (value: string) => void;
}


export default function FiltreArticle({ nom, updateField }: Props) {
  const url = apiUrl.STARTICLE_NOM_URL

  const fetchArticles = async (search: string) => {
    const response = await fetch(`${url}?nom=${search}`);
    const articles: Articles = await response.json();
    return articles.results
      .filter((u: Article) => u.nom && u.nom.toLowerCase().includes(search.toLowerCase()))
      .map((u: Article) => ({ 
        id: u.id, 
        nom: u.nom 
      }));
  };
    
  const handleChange = (item: { id: number; nom: string } | string | number) => {
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

