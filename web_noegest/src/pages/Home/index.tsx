import { useAuth } from "../../hooks/useAuth.tsx";
import { Card } from "../../components/Card";
import { useTheme } from "../../hooks/useTheme.tsx";
import { Button } from "../../components/Button/index.tsx";
import { vars } from "../../assets/styles/theme.css.ts";

export default function Home () {
  const { user } = useAuth();
  const { theme, toggleTheme } = useTheme();
  return (
    <div>
      <h1>Welcome {user?.username}</h1>

      <h1>Choix du thème</h1>

      <p>Thème actuel : <strong>{theme}</strong></p>
      <h1>Mon App ({theme})</h1>
      <div>
        <span>Salut, {user?.username} </span>
        <Button onClick={toggleTheme}>
          Passer en {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
        </Button>
      
      </div>
      <hr style={{ margin: '20px 0', borderColor: vars.color.border }} />
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
      < Card title='MyCard Tittle' 
        description="Je la décris ainsi" 
        onAction={()=> alert('Cliqué !')} 
      />
    </div>
  );
};


