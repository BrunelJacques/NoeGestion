// src/utils/getUser.tsx

import {useAuth} from "../hooks/useAuth.tsx";

export default function getUser():string {
  const {user} = useAuth();
  const clientUser = user
    ? `${user.lastName ?? ''} ${user.firstName ?? ''}`.trim()
    : 'Anonyme';
  const platform = navigator.platform || 'Inconnu';
  return `${clientUser} / ${platform}`;
}

