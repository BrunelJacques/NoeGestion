// src/ui/variants/XinputDate.tsx
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth.tsx";
import { Card } from "../../ui/Card/index.tsx";
import epicerie from "../../assets/images/epicerie2x.jpg";
import minibus from "../../assets/images/minibus2x.jpg";
import * as s from "./index.css.ts"


export default function Home () {
  const { user } = useAuth();
  const actif = false;
  
  return (
    <div>
      <h3>Noegestion de Matthania</h3>
      <hr></hr>
      <h5>Bienvenue  {user?.username} entre dans le service</h5> 
      <Card title={"Cliquez sur une application active"} description={"les applications sont activées selon les droits de chaque utilisateur"} >
        
        <Link 
        className={`card ${s.cardAppli}`}   
        to="/stocks">
          <img className={s.image} title="imgEpicerie" src={epicerie} />
          <div className={s.cardText}>
            <div>STOCKS</div>
            <div>pour un calcul de prix de journée nourriture</div>
          </div>
        </Link>

        <Link 
        to="/km"
        onClick={e => !actif && e.preventDefault()}
        className={actif ? `card ${s.cardAppli}` : `card ${s.off}`}>
          <img className={s.image} title="imgMinibus" src={minibus} />
          
          <div className={s.cardText}>
            <div className={s.cardText}>Suivi KM {!actif && "_INACTIF"}</div>
              pour le suivi des km et l'affectation du coût
          </div>
        </Link>

      </Card>
    </div>
  );
};


