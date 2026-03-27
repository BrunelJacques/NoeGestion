import Xbutton from '../../components/Xbutton';
import { Wbutton } from '../../ui/Wbutton';
import Xinput from '../../ui/Xinput';
import { useState } from 'react';
import HelloWorld from '../HelloWorld';
import { Error } from '../../components/Error';

export default function Galery() {
  console.clear();
  console.log("test page");
  const [myVariable, setMyVariable] = useState("");

  return (
    <div> 
      
      <h1>'Galery' pour tests</h1>
      <p>Content would be below </p>

      <HelloWorld />

      <div>
        <Wbutton
          onClick={() => console.log("WButton clicked")}
          //disabled={true}
          // type='button' // 'button'|'submit'|'reset'
        >
          Wbutton Click here
        </Wbutton>
      </div>
      <div>
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

