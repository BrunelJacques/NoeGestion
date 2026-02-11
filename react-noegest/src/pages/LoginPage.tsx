import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";
import { FancyInput, FancyInputPassword } from "../components/general/FancyInput.tsx";

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
      <FancyInput
        value={username}
        onChange={e => setUsername(e)}
        placeholder="Identifiant"
      />
    <FancyInputPassword
      value={password}
      onChange={setPassword}
      placeholder="Mot de passe"
    />
    <button type="submit">Log in</button>
    </form>
  );
};

export default LoginPage;
