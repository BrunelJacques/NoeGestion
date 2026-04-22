import { hello } from "./index.css";
import { useAuth } from "../../hooks/useAuth.tsx";

export function Hello() {
    const { user } = useAuth();
  return (
    <div className={hello}>
        <h5>Hello Noegest user: {user?.lastName}  {user?.firstName}</h5> 
    </div>
  );
}

export default Hello
