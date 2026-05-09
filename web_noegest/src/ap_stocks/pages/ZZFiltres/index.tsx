//src/ap_stocks/components/Filtres/index.tsx
import { Services } from "../../stConstants";


import * as s from "./index.css";
import { Xbutton } from "../../../ui/Xbutton";
import { Xautocomplete } from "../../../ui/Xautocomplete";
//import { useFetch } from "../../../hooks/useFetch";
import apiUrl from "../../../constants/api.Constants";
import type { Article, Articles } from "../../types/article";
import { Xselect } from "../../../ui/Xselect";
import { useSelectObject } from "../../hooks/useSelectObject";
import { useFiltresStocks } from "../../hooks/useFiltres";
import { FILTRES0 } from "../../types/params";

export default function Filtres() {
  // services
  const { filtres } = useFiltresStocks(FILTRES0); 
  const service = useSelectObject(Services, filtres.service);


  //articles
  const url = apiUrl.STARTICLE_NOM_URL

  const fetchArticles = async (search: string) => {
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
      
      
      <div className={s.entree}>
          <Xautocomplete 
            label="Article"
            name="article"
            fetchItems={fetchArticles}
            onSelect={(item) => {
              console.log('Sélectionné:', item)
            }}
            placeholder="Tapez quelques lettres..."
          />

      </div>

      <div className={s.entree}>
        <Xselect<number|string>
          label="Service"
          name="service"
          value={service.value}
          onChange={service.onChange}
          options={service.options}
        />
      </div>

      <Xbutton type="submit" altClassName="right" form="filtresForm">
        Validation
      </Xbutton>
    </div>

  </section>
  );
}

