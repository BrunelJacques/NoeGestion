import { Card } from "../../ui/Card";
import { helloWorld } from "./index.css";
import { useAuth } from "../../hooks/useAuth.tsx";
import { useTheme } from "../../hooks/useTheme.tsx";
import {  local } from "./index.css.ts";

export function HelloWorld() {
    const { user } = useAuth();
    const { theme, toggleTheme } = useTheme()
  return (
    <div>
      <div className={helloWorld}>
        <h3>Hello world </h3>
        <h5>user: {user?.lastName}  {user?.firstName}</h5> 
      </div>
      < Card title='MyCard Tittle' 
        description="Je la décris ainsi"
        onAction= {()=>console.log("clic my car")}
       />
            <p>Thème actuel : {theme}</p>
            <div>
              <button onClick={()=>toggleTheme(theme)}>
                Passer en mode {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
              </button>
            
            </div>
            <div className = {local}>
              Card stylée localement
            </div>      
    </div>
  );
}

export default HelloWorld
