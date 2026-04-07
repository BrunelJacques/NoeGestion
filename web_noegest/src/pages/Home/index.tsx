import { useAuth } from "../../hooks/useAuth.tsx";
import Xtest from "../../ui/Xtest/index.tsx";

export default function Home () {
  const { user } = useAuth();
  
  return (
    <div>
      <h1>Welcome {user?.username}</h1>
      <Xtest 
        value= "valeur présente"
        onChange={val => console.log("Nouvelle valeur:", val)}
        placeholder="placeholder"
        label="libellé" />
    </div>
  );
};


