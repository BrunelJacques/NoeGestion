import { Card } from "../../components/Card";
import { helloWorld } from "./index.css";


export function HelloWorld() {
  return (
    <div>
      <div className={helloWorld}>
        Hello world
      </div>
      < Card title='MyCard Tittle inside helloWorld' 
        description="Je la décris ainsi"
        onAction= {()=>console.log("clic my car")}
       />
      
    </div>
  );
}

export default HelloWorld
