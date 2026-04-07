import { helloWorld } from "./index.css";
import { useAuth } from "../../hooks/useAuth.tsx";

export function HelloWorld() {
    const { user } = useAuth();
  return (
    <div className={helloWorld}>
        <h5>Hello world user: {user?.lastName}  {user?.firstName}</h5> 
    </div>
  );
}

export default HelloWorld
