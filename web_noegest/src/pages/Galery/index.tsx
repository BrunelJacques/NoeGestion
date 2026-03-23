import Xbutton from '../../components/Xbutton';
import Xinput from '../../components/Xinput';
import { useState } from 'react';
import HelloWorld from '../HelloWorld';
import { Error } from '../../components/Error';

export default function Galery() {
  console.clear();
  console.log("test page");
  const [myVariable, setMyVariable] = useState("");

  return (
    <div> 
      
      <h1>Test de Mon Composant</h1>
      <p>Content would be below </p>

      <HelloWorld />
      <div>
        <Xbutton
          label='Click here' 
          onClick={() => console.log("Button clicked")}
        />
      </div>
      <div>
        <Xinput
          value= {myVariable}
          onChange={setMyVariable}
          placeholder="Ici saisie de ma variable"  />
    
      </div>
      <div><Error /></div>

      <div>------ end ------</div>  
    </div>

  )
}

