// src/ui/variants/XinputDate.tsx
import { useAuth } from "../../hooks/useAuth.tsx";
import { XinputDate } from "../../ui/variants/XinputDate.tsx";
import { Xinput } from "../../ui/Xinput/index.tsx";
import { XinputPhone } from "../../ui/variants/XinputPhone.tsx";

function noAction(val:React.ChangeEvent<HTMLInputElement> ){
  if (val.target.value.trim() !== "") {
    console.log("Home Noaction:", val);
  }

  return
}

export default function Home () {
  const { user } = useAuth();
  
  return (
    <div>
      <h1>Welcome {user?.username}</h1>

      <Xinput 
        value={user?.bday}
        onChange={noAction}
        placeholder="placeholder"
        label="Xinput nature" />

      <XinputDate
        value={user?.bday}
        onChange={noAction}
        label="XinputDate"
        autoComplete="bday"
      />

      <XinputPhone
        value={user?.phone}
        onChange={noAction}
        label="XinputPhone"
        autoComplete="06xxyyzzww"
      />


    </div>
  );
};


