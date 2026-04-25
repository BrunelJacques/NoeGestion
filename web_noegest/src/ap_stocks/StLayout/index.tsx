// src/ap_stocks/Layout/index.tsx
import { Outlet } from "react-router-dom";
import * as s from "./index.css";
import { StMenu } from "../../ap_stocks/components/StMenu";


export default function StLayout() {

  return (
    <main className={s.domainLayout}>
      <StMenu className={s.menu} />
      <Outlet />
    </main>
  );  
}
