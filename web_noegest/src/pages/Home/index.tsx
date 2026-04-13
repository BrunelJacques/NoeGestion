// src/ui/variants/XinputDate.tsx
import { useAuth } from "../../hooks/useAuth.tsx";


export default function Home () {
  const { user } = useAuth();
  
  return (
    <div>
      <h1>Welcome {user?.username}</h1>

    </div>
  );
};


