//src/stocks/pages/Filtres/index.tsx
import CardFiltre from "../../components/CardFiltre";
import MenuFiltre from "../../components/MenuFiltre";
import * as s from "./index.css";

export default function Filtres () {
  return (
    <div className={s.filtres}>
      <MenuFiltre altClassName={`${s.menu}`}  />
      <CardFiltre altClassName={`${s.card}`} />
    </div>
  );
} 
