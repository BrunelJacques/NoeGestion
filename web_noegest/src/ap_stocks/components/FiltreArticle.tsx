//src/ap_stocks/components/FiltreArticle/index.tsx

import { Xautocomplete } from "../../ui/Xautocomplete";
import apiUrl from "../../constants/api.Constants";
import type { Article, Articles } from "../types/article";


export default function FiltreArticle() {

  //articles
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
    
  return (
    <>
      <Xautocomplete 
        label="Article"
        name="article"
        fetchItems={fetchArticles}
        onSelect={(item) => {
          console.log('Sélectionné:', item)
        }}
        placeholder="Tapez quelques lettres..."
      />
    </>
  );
}

