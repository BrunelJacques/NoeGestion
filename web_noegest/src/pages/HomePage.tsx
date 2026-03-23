import { useAuth } from "../hooks/useAuth.tsx";
import Footer from "../layout/Footer/index.tsx";

export default function HomePage () {
  const { user } = useAuth();

  return (
    <div>
      <h1>Welcome {user?.username}</h1>
      {/* Add nested routes if you want */}
      <Footer />
    </div>
  );
};


