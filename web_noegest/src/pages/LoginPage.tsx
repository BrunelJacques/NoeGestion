import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth.tsx";
import { Xinput, XinputPassword } from "../components/Xinput/index.tsx";

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
      <Xinput
        value={username}
        onChange={e => setUsername(e)}
        placeholder="Identifiant"
      />
    <XinputPassword
      value={password}
      onChange={setPassword}
      placeholder="Mot de passe"
    />
    <button type="submit">Log in</button>
    </form>
  );
};

export default LoginPage;
