import { Link } from "react-router-dom";
import { useAuth } from "../context/useAuth.tsx";

const HomePage: React.FC = () => {
  const { user, logout } = useAuth();

  return (
    <div>
      <h1>Welcome {user?.username}</h1>
      <nav>
        <Link to="/">Home</Link>{" | "}
        <Link to="/page1">Page 1</Link>{" | "}
        <Link to="/page2">Page 2</Link>{" | "}
        <button onClick={logout}>Logout</button>
      </nav>
      {/* Add nested routes if you want */}
    </div>
  );
};

export default HomePage;
