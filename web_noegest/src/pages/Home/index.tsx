import { useAuth } from "../../hooks/useAuth.tsx";
import Footer from "../../layout/Footer/index.tsx";

import { useContext } from "react";
import { ThemeContext } from "../../contexts/ThemeContext.ts";


export default function Home () {
  const { user } = useAuth();

  const context = useContext(ThemeContext);

  if (!context) throw new Error("ThemeContext missing");

  const { theme, setTheme } = context;


  return (
    <div>
      <h1>Welcome {user?.username}</h1>
      {/* Add nested routes if you want */}
      <Footer />
      <h1>Choix du thème</h1>

      <p>Thème actuel : {theme}</p>

      <button onClick={() => setTheme("light")}>Light</button>
      <button onClick={() => setTheme("dark")}>Dark</button>
      <button onClick={() => setTheme("purple")}>Purple</button>

    <div
      style={{
        background: "var(--color-bg)",
        color: "var(--color-text)",
        border: "1px solid green",
        padding: "1rem",
      }}
    >
      Card stylée avec thème
    </div>
    </div>
  );
};


