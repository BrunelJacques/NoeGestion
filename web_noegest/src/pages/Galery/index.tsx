import Xbutton from '../../ui/Xbutton';
import Xinput      from '../../ui/Xinput';
import { useState } from 'react';
import HelloWorld from '../HelloWorld';
import ErrorBanner  from '../../components/ErrorBanner';
import { hr } from './index.css';
import { useError } from '../../contexts/ErrorContext';


export default function Galery() {
  console.clear();
  console.log("test page");
  const [myVariable, setMyVariable] = useState("");
  const { setError } = useError();
  setError("Erreur de test dans Galery");

  return (
    <div> 
      
      <h1>'Galery' pour tests</h1>
      <p>rappel HelloWorld </p>
      <hr className={hr} />

      <HelloWorld />
      <p>Autes tests connecté</p>
      <hr />
      <div>
        <Xbutton
          onClick={() => console.log("WButton clicked")}
          //disabled={true}
          type='button' // 'button'|'submit'|'reset'
        >
          Xbutton Click here
        </Xbutton>

        <Xinput
          value= {myVariable}
          onChange={setMyVariable}
          placeholder="Ici saisie de ma variable"  />
    
      </div>
      <div>
        <h3>--------- Ici le test erreur --------------------</h3>

        <ErrorBanner />
        </div>

      <div>------ end ------</div>  
    </div>

  )
}

