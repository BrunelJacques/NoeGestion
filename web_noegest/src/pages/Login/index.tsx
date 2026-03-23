//Login.tsx

import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import Xinput, { XinputPassword } from "../../components/Xinput";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // URL d'origine ou fallback vers "/"
  const from = location.state?.from || "/";

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();

    const success = await login(username, password);

    if (success) {
      navigate(from, { replace: true });
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h1>Login</h1>

      <Xinput
        value={username}
        onChange={setUsername}
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
}
