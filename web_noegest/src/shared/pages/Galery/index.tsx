import React from 'react';
import Xbutton from '../../components/Xbutton';


const MyComponent = () => (<div>Hello World</div>)

const Galery: React.FC = () => {
  console.clear();
  console.log("test page"); 
  return (
    <div> 
      <h1>Test de Mon Composant</h1>
      <p>Content would be below </p>

      <MyComponent />
 
      <Xbutton
        label='Click here' 
        onClick={() => console.log("Button clicked")}
      />
      
      <div>------ end ------</div>  
    </div>

  )
}

export default Galery;