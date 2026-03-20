import { useAuth } from "../auth/context/useAuth.tsx";
import Footer from "../shared/components/Footer/index.tsx";

const HomePage: React.FC = () => {
  const { user } = useAuth();

  return (
    <div>
      <h1>Welcome {user?.username}</h1>
      {/* Add nested routes if you want */}
      <Footer />
    </div>
  );
};

export default HomePage;
