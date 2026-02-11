import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";

const LoginPage: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (
    e: React.SyntheticEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    await login(username, password);
    navigate("/");
  };
  return (
    <form onSubmit={handleSubmit}>
      <h1>Login</h1>
      <input
        value={username}
        onChange={e => setUsername(e.target.value)}
        placeholder="Username"
      />
      <input
        type="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        placeholder="Password"
      />
      <button type="submit">Log in</button>
    </form>
  );
};

export default LoginPage;
