import Xbutton from '../../ui/Xbutton';
import Xinput      from '../../ui/Xinput';
import HelloWorld from '../HelloWorld';
import { useState } from 'react';
import { useError } from '../../contexts/ErrorContext';
import { Card } from "../../ui/Card";
import { useTheme } from "../../hooks/useTheme.tsx";
import { hrstyle, localStyle } from "./index.css.ts";
import { useAuth } from '../../hooks/useAuth.tsx';



export default function Galery() {

  const [myVariable, setMyVariable] = useState("");
  const { setError } = useError();
  const { user } = useAuth();
  const { theme, toggleTheme } = useTheme();

  return (
    <> 
      <h3>Bonjour user: {user?.lastName}  {user?.firstName}</h3> 
      <h1>'Galery'</h1>
      <h5>rappel HelloWorld </h5>
      <HelloWorld />
      <h5>Fin HelloWorld - autres éléments de Galery: </h5>
      <hr className = {hrstyle} />

      <Xbutton
        onClick={() => setError("Erreur déclenchée manuellement par Gallery")}
        //disabled={true}
        type='button' // 'button'|'submit'|'reset' 
      >
        Xbutton: Déclencher une erreur?
      </Xbutton>

      <Xinput
        value= {myVariable}
        onChange={setMyVariable}
        placeholder="Ici saisie de ma variable"  />
    
      <Card title='MyCard Tittle' 
        description="Je la décris ainsi"
        onAction= {()=>console.log("clic my car")} />

      <p>Thème actuel : {theme}</p>
      <button onClick={()=>toggleTheme(theme)}>
        Passer en mode {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
      </button>

      <div className = {localStyle}>
        div stylé localement Galery
        <Xinput 
        onChange = {() => {}}
        placeholder="Saisissez quelque chose..." />
      </div>
      <div>------ end ------</div>  
      <hr />
    </>

  )
}

