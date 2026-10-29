// src/ap_stocks/Layout/index.tsx
import { Outlet } from "react-router-dom";
import * as s from "./index.css";
import { StMenu } from "../components/StMenu";
import { FiltresProvider } from "../hooks/contextFiltres/FiltresProvider";
import {MouvementProvider} from "../hooks/contextMouvement/MouvementProvider.tsx";
import { MVT0 } from "../types/mouvement.ts";


export default function StLayout() {

  return (
    <FiltresProvider>
      <MouvementProvider initialMouvement={MVT0}>
        <main className={s.domainLayout}>
          <StMenu className={s.menu} />
          <Outlet />
        </main>
      </MouvementProvider>
    </FiltresProvider>

  );  
}
