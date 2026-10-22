//src/ap_stocks/components/FieldArticle/index.tsx

import { Xautocomplete } from "../../ui/Xautocomplete";
import apiUrl from "../../constants/api.Constants";
import type {Article, Articles } from "../types/article";
import type { Item } from "../../types/item.ts";
import type {Mouvement } from "../types/mouvement.ts";


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

const calculeArticle = (newArt:Article, mvtPatch: Mouvement) : Mouvement => {
  const { fournisseur, ...leReste } = mvtPatch
  return {
    ...leReste,
    idArticle: newArt.id,
    prix_unit: newArt.prix_moyen??mvtPatch.prix_unit,
    rations: newArt.rations ?mvtPatch.qte_mouvement * newArt.rations:1,
    fournisseur: newArt.fournisseur?? mvtPatch.fournisseur,
    saisie: new Date().toLocaleDateString('en-CA'),
    nb_colis: (newArt.colis_par && newArt.colis_par > 0)?
      mvtPatch.qte_mouvement / newArt.colis_par : 1,
  }
}

// ChangementArticle applique les modifications induites
export async function changementArticle(
    art: Item,
    mvtPatch: Mouvement)
    : Promise<Mouvement> {
  const result = await fetchidArticle(Number(art.id));
  const article = result[0];
  const newPatch = calculeArticle(article, mvtPatch);

  console.log("Traitement du changment d'article:", mvtPatch)
  return newPatch
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

