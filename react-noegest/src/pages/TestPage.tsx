import React from 'react';
import { FancyButton } from '../components/general/FancyButton.tsx';

const MyComponent = () => (<div>Hello World</div>)
const TestPage: React.FC = () => {
  console.clear();
  console.log("test page"); 
  return (
    <div> 
      <h1>Test de Mon Composant</h1>
      <p>Content would be below </p>

      <MyComponent />
 
      <FancyButton
        label='Click here' 
        onClick={() => console.log("Button clicked")}
      />
      
      <div>------ end ------</div>  
    </div>

  )
}

export default TestPage;