// src/ui/XlinkAppli/index.tsx
import { Link } from "react-router-dom";
import { AppCard } from "../AppCard";
import * as s from "./index.css.ts";


type XlinkAppliProps = {
  to: string
  disabled?: boolean
  imageSrc: string
  title: string
  description: string
}

export function XlinkAppli({
  to,
  disabled=false,
  imageSrc,
  title,
  description
}: XlinkAppliProps) {
  return (
  <>
    <Link 
      className={` ${s.xLinkRecipe({ disabled })}`}   
      to={to}
      onClick={e => disabled && e.preventDefault()}
      //</Card>className={actif ? `card ${s.cardAppli}` : `card ${s.off}`}>
    >
      <AppCard>
        <img className={s.image} title={title} src={imageSrc} alt={title} />
      </AppCard>
      <div className={s.cardText}>
        <h3>{title}</h3>
        {disabled && <span className={s.overlay}>Inactif</span>}
        <p>{description}</p>
      </div>
    </Link>
    
  </>
  )
}

