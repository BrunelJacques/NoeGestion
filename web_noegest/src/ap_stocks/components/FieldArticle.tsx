//src/ap_stocks/components/FieldArticle/index.tsx

import { Xautocomplete } from "../../ui/Xautocomplete";
import apiUrl from "../../constants/api.Constants";
import {ART0, type Article, type Articles } from "../types/article";
import type { Item } from "../../types/item.ts";
import type {Mouvement } from "../types/mouvement.ts";
import type { MvtFiltres } from "../types/mvtFiltres.ts";



const fetchArticlesByParam = async (baseUrl: string, value: string | number) => {
  const url =`${baseUrl}${encodeURIComponent(value)}`
  const response = await fetch(url);
  if (!response.ok) throw new Error("Erreur lors de la récupération des articles");
  const articles: Articles = await response.json();
  return articles.results;
};

const fetcharticle_id = (id: number) =>
  fetchArticlesByParam(`${apiUrl.STARTICLE_URL}?id=`, id);

const fetchArticles = (search: string) =>
  fetchArticlesByParam(`${apiUrl.STARTICLE_NOM_URL}?nom=`, search);

const calculeArticle = (newArt:Article, mvtPatch: Mouvement, filtres: MvtFiltres) : Mouvement => {
  const qteMvt = mvtPatch.qte_mouvement * mvtPatch.sens
  const {qte_stock, prix_moyen, ...resteArt} = newArt
  const {fournisseur, ...leReste} = mvtPatch
  const calcPxMoy = (prix_moyen * qte_stock + qteMvt * mvtPatch.prix_unit)
    / (qteMvt + qte_stock)

  const pxMoy = filtres.pageOrigine === "entrees" ? calcPxMoy : prix_moyen

  const updatedArt = {
    ...resteArt,
    qte_stock: newArt.qte_stock + qteMvt,
    prix_moyen: pxMoy
  }

  return {
    ...leReste,
    article_id: newArt.id,
    article: (newArt.id != 0) ? updatedArt : undefined,
    prix_unit: newArt.prix_moyen ?? mvtPatch.prix_unit,
    rations: newArt.rations ? mvtPatch.qte_mouvement * newArt.rations : 1,
    fournisseur: newArt.fournisseur ?? mvtPatch.fournisseur,
    saisie: new Date().toLocaleDateString('en-CA'),
    nb_colis: (newArt.colis_par && newArt.colis_par > 0) ?
      qteMvt / newArt.colis_par : 1,
  }
}


// ChangementArticle applique les modifications induites
export async function changementArticle(
  artItem: Item,
  mvtPatch: Mouvement,
  filtres: MvtFiltres,
): Promise<Mouvement> {

  const article = (artItem.id == 0)
    ? ART0
    : (await fetcharticle_id(Number(artItem.id)))[0];
  console.log("fetchArticle", article);

  return calculeArticle(article, mvtPatch, filtres);
}

// Composition de l'affichage de l'article
interface Props {
  nomArt: string | null | undefined;
  updateField: (art: Item|null) => void;
  required?: boolean;
}

// paramétrage de la saisie d'article avec autocomplétion
export default function FieldArticle({ nomArt, updateField, required=true }: Props) {
  const handleChange = (item: Item) => {
    updateField(item);
  }

  return (
    <>
      <Xautocomplete 
        label="Article"
        name="article"
        value={nomArt ?? ""}
        required={required}
        fetchItems={fetchArticles}
        onSelect={handleChange }
      />
    </>
  );
}

