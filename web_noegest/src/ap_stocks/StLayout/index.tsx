// src/ap_stocks/Layout/index.tsx
import { Outlet } from "react-router-dom";
import * as s from "./index.css";
import { StMenu } from "../../ap_stocks/components/StMenu";
import { FiltresProvider } from "../hooks/contextFiltres/FiltresProvider";


export default function StLayout() {

  return (
    <FiltresProvider>
      <main className={s.domainLayout}>
        <StMenu className={s.menu} />
        <Outlet />
      </main>
    </FiltresProvider>

  );  
}
