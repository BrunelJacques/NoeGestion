import { useAuth } from "../auth/context/useAuth.tsx";

const HomePage: React.FC = () => {
  const { user } = useAuth();

  return (
    <div>
      <h1>Welcome {user?.username}</h1>
      {/* Add nested routes if you want */}
    </div>
  );
};

export default HomePage;
