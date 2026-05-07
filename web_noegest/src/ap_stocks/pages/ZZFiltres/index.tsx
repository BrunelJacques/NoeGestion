//src/ap_stocks/components/Filtres/index.tsx
import * as s from "./index.css";
import { Xbutton } from "../../../ui/Xbutton";
import { Autocomplete } from "../../../ui/Xautocomplete";
//import { useFetch } from "../../../hooks/useFetch";
import apiUrl from "../../../constants/api.Constants";
import type { Article, Articles } from "../../types/article";

export default function Filtres() {

  const url = apiUrl.STARTICLE_NOM_URL
  //const { filtres, setFiltres } = useFetch(url); 

const handleFetch = async (search: string) => {
  const response = await fetch(`${url}?nom=${search}`);
  const articles: Articles = await response.json();
  
  return articles.results
    // Remplacement de .name par .nom ici :
    .filter((u: Article) => u.nom && u.nom.toLowerCase().includes(search.toLowerCase()))
    .map((u: Article) => ({ 
      id: u.id, 
      nom: u.nom 
    }));
};
    
return (
  //Titres sous-titres
  <section className={s.wrapper}>

    <div className={s.wrapForm}>
      <div id="filtresForm" className={s.formStyle}>

          <h1>Recherche d'articles</h1>
          <Autocomplete 
            fetchItems={handleFetch} 
            onSelect={(item) => {
              
              console.log('Sélectionné:', item)
            }}
            placeholder="Tapez un nom..."
          />

      </div>
      <Xbutton type="submit" altClassName="right" form="filtresForm">
        Validation
      </Xbutton>
    </div>

  </section>
  );
}

