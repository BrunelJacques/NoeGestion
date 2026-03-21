import { useAuth } from "../hooks/useAuth.tsx";
import Footer from "../layout/Footer/index.tsx";

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
