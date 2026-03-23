/* import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth.tsx";
import { Xinput, XinputPassword } from "../components/Xinput/index.tsx";
 */

// LoginPage.tsx
import type { FormEvent } from 'react';
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import Xinput from "../components/Xinput";
import { XinputPassword } from "../components/Xinput";

function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // URL d'origine ou fallback vers "/"
  const from = location.state?.from || "/";

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const success = await login(username, password);

    if (success) {
      navigate(from, { replace: true }); // <-- redirection vers la page initiale
    }
  }

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
}

export default LoginPage;

/* 
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
 */