import { useAuth } from "../../hooks/useAuth.tsx";
import { Card } from "../../ui/Card/index.tsx";
import { useTheme } from "../../hooks/useTheme.tsx";
import { hr, local } from "./index.css.ts";

export default function Home () {
  const { user } = useAuth();
  const { theme, toggleTheme } = useTheme();
  
  return (
    <div>
      <h1>Welcome {user?.username}</h1>

      <p>Thème actuel : {theme}</p>
      <h1>Mon App ({theme})</h1>
      <div>
        <button onClick={()=>toggleTheme(theme)}>
          Passer en mode {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
        </button>
      
      </div>
      <hr className={hr} />
      <div className = {local}>
        Card style localement Home
      </div>
      < Card title='MyCard Tittle' 
        description="Je la décris ainsi" 
        onAction={()=> alert('Cliqué !')} 
      />
    </div>
  );
};


