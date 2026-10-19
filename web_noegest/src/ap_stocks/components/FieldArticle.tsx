//src/ap_stocks/components/FieldArticle/index.tsx

import { Xautocomplete } from "../../ui/Xautocomplete";
import apiUrl from "../../constants/api.Constants";
import type { Articles } from "../types/article";
import type { Item } from "../../types/item.ts";
import type {Mouvement, MvtActif } from "../types/mouvement.ts";


const fetchArticlesByParam = async (baseUrl: string, value: string | number) => {
  const url =`${baseUrl}${encodeURIComponent(value)}`
  const response = await fetch(url);
  if (!response.ok) throw new Error("Erreur lors de la récupération des articles");
  const articles: Articles = await response.json();
  return articles.results;
};

const fetchidArticle = (id: number) =>
  fetchArticlesByParam(`${apiUrl.STARTICLE_URL}?id=`, id);

const fetchArticles = (search: string) =>
  fetchArticlesByParam(`${apiUrl.STARTICLE_NOM_URL}?nom=`, search);

// ChangeArticle retourne l'ensemble des updateField à faire
export async function ChangeArticle(
    art: Item,
    mouvement: Mouvement)
    : Promise<[keyof MvtActif, MvtActif[keyof MvtActif]][]> {
  const numericId = Number(art.id);
  const result = await fetchidArticle(numericId);
  const article = result[0];
  const today: string = new Date().toLocaleDateString('en-CA');

  console.log("Traitement du changment d'article:",numericId, mouvement, result)
  return [
    ['idArticle' , numericId],
    ['article', article],
    ['saisie',today]
  ]
}

interface Props {
  nomArt: string | null | undefined;
  updateField: (art: Item|null) => void;
}

// paramétrage de la saisie d'article avec autocomplétion
export default function FieldArticle({ nomArt, updateField }: Props) {

  const handleChange = (item: Item) => {
    updateField(item);
  }

  return (
    <>
      <Xautocomplete 
        label="Article"
        name="article"
        value={nomArt ?? ""}
        fetchItems={fetchArticles}
        onSelect={handleChange }
      />
    </>
  );
}

