import { Xbutton } from '../../ui/Xbutton';
import Xinput      from '../../ui/Xinput';
import { useState } from 'react';
import HelloWorld from '../HelloWorld';
import { Error } from '../../components/Error';
import { hr } from './index.css';

export default function Galery() {
  console.clear();
  console.log("test page");
  const [myVariable, setMyVariable] = useState("");

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
        <h3>--------- Ici le test erreur 404 --------------------</h3>
        <Error />
        </div>

      <div>------ end ------</div>  
    </div>

  )
}

