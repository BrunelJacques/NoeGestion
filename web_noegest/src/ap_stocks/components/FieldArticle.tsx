//src/ap_stocks/components/FieldArticle/index.tsx

import { Xautocomplete } from "../../ui/Xautocomplete";
import apiUrl from "../../constants/api.Constants";
import type { Articles } from "../types/article";
import type { Item } from "../../types/item.ts";
import type { MvtPatchObj } from "../types/mouvement.ts";


const fetchArticlesByParam = async (baseUrl: string, value: string | number) => {
  const url =`${baseUrl}${encodeURIComponent(value)}`
  const response = await fetch(url);
  if (!response.ok) throw new Error("Erreur lors de la récupération des articles");
  const articles: Articles = await response.json();
  console.log("fetchByParams",url,articles.results)
  return articles.results;
};

const fetchIdArticle = (id: number) =>
  fetchArticlesByParam(`${apiUrl.STARTICLE_URL}?id=`, id);

const fetchArticles = (search: string) =>
  fetchArticlesByParam(`${apiUrl.STARTICLE_NOM_URL}?nom=`, search);

export async function ChangeArticle(art: Item):
  Promise<[keyof MvtPatchObj,number|string][]> {
  const numericId = Number(art.id);
  const result = await fetchIdArticle(numericId);
  console.log("Traitement du changment d'article:",numericId, result)
  return [['IdArticle' , numericId],]
}

interface Props {
  id: string | null | undefined;
  updateField: (art: Item|null) => void;
}

// paramétrage de la saisie d'article avec autocomplétion
export default function FieldArticle({ id, updateField }: Props) {

  const handleChange = (item: Item) => {
    updateField(item);
  }

  return (
    <>
      <Xautocomplete 
        label="Article"
        name="article"
        value={id ?? ""}
        fetchItems={fetchArticles}
        onSelect={handleChange }
      />
    </>
  );
}

