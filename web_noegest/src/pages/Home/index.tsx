import { useAuth } from "../../hooks/useAuth.tsx";
import XdateInput from "../../ui/Xdate/index.tsx";
import { Xtest } from "../../ui/Xtest/index.tsx";
import { XinputDate } from "../../ui/Xinput/index.tsx";


function noAction(val: string){
  if (val.trim() !== "") {
    console.log("Noaction valeur:", val);
  }
  return
}

export default function Home () {
  const { user } = useAuth();
  
  return (
    <div>
      <h1>Welcome {user?.username}</h1>
      <Xtest 
        value={user?.naissance}
        onChange={(val: string) => console.log("Nouvelle valeur:", val)}
        placeholder="placeholder"
        label="libellé" />

      <XdateInput
        value={user?.naissance}
        onChange={noAction}
        label="Date de naissance"
      />

      <XinputDate
        value={user?.naissance}
        onChange={noAction}
        label="Date de naissance"
        autoComplete="bday"
      />

    </div>
  );
};


