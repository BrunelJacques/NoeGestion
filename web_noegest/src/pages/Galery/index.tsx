import { Xbutton } from '../../ui/Xbutton';
import { Xinput}      from '../../ui/Xinput';
import Hello from '../Hello';
import InfoBanner from "../../components/InfoBanner";
import { useState } from 'react';
import { Card } from "../../ui/Card";
import { useTheme } from "../../hooks/useTheme.tsx";
import { hrstyle, localStyle } from "./index.css.ts";
import { useAuth } from '../../hooks/useAuth.tsx';
import { useError} from "../../hooks/useError.tsx";


export default function Galery() {

  const [myVariable, setMyVariable] = useState("");
  //const { setError } = useError();
  const { user } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const { setError } = useError();
  //setError("Test d'error depuis Galery")

  return (
    <> 
      <h3>Bonjour user: {user?.lastName}  {user?.firstName}</h3> 
      <h1>'Galery'</h1>

      <Hello />
      <h5>Fin Hello - autres éléments de Galery: </h5>
      <hr className = {hrstyle} />

      <Xbutton
        onClick={() => setError("Erreur déclenchée manuellement par Gallery")}
        //disabled={true}
        type='button' // 'button'|'submit'|'reset' 
      >
        Xbutton: Déclencher une erreur?
      </Xbutton>

       <Xinput
         label="Ici un Xinput basique"
        value= {myVariable}
        onChange={(e:React.ChangeEvent<HTMLInputElement>) => {
              setMyVariable(e.target.value)
        }}
        placeholder="Ici saisie de ma variable"  /> 
  
        <Card 
          title='MyCard Tittle' 
          description="Je la décris ainsi"
        >
          ceci est un child à composer et styler
        </Card>        
         
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

      {InfoBanner("Ceci est une InfoBanner")}
      <div>------ end ------</div>  
      <hr />
    </>

  )
}

