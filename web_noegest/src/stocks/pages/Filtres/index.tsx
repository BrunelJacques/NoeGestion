//src/stocks/pages/Filtres/index.tsx
import CardFiltre from "../../components/CardFiltre";
import MenuFiltre from "../../components/MenuFiltre";

export default function Filtres () {
  return (
    <div className="filtres">
      <MenuFiltre />
      <CardFiltre />
    </div>
  );
} 
