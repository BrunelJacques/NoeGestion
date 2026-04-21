// src/pages/Home.tsx
import { useAuth } from "../../hooks/useAuth.tsx";
import { Card } from "../../ui/Card/index.tsx";
import { AppCard } from "../../ui/AppCard/index.tsx";
import epicerie from "../../assets/images/epicerie2x.jpg";
import minibus from "../../assets/images/minibus2x.jpg";
import { XlinkAppli } from "../../ui/XlinkAppli/index.tsx";

export default function Home () {
  const { user } = useAuth();
  const disabled = true;
  
  return (
    <div>
      <AppCard>
        <h3>Noegestion de Matthania</h3>
        <h5>Bienvenue  {user?.username} entre dans le service</h5> 
      </AppCard>
      <Card>
        <AppCard>
          <h5>Cliquez sur une application active</h5>
          <p>les applications sont activées selon les droits de chaque utilisateur"</p>
        </AppCard>     

        <XlinkAppli
          to="/stocks"
          disabled={false}  
          imageSrc={epicerie}
          title="Gestion Stocks"
          description="suivi des stocks pour prix de journée"
        />

        <XlinkAppli
          to="/km"
          disabled={disabled}  
          imageSrc={minibus}
          title="Suivi KM"
          description="suivi des véhicules et l'affectation du coût"
        />

      </Card>
    </div>
  );
};


