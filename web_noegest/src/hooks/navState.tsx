// src/hooks/navState.tsx
import { useLocation } from "react-router-dom";
import { capitalize } from '../utils/string.ts';


/* Gestion de l'historique de navigation pour les boutons de retour */
export function useNavState() {
  const location = useLocation();
  // use pile existante ou crée une vide
  const currentStack = Array.isArray(location.state?.pageStack)
    ? location.state.pageStack
    : [];

  const nameLocation = capitalize(location.pathname.split('/').slice(-1)[0] || 'Accueil');

  // Cette fonction génère le prochain state à la demande (au clic)
  const getNavState = (customName?: string) => {
    return [
      ...currentStack,
      { name: customName ?? nameLocation, url: location.pathname }
    ];
  };

  return {
    navState: getNavState(), // Pour NavLink (calcul direct retourne valeur)
    getNavState: getNavState  // Pour navigate (calcul à la demande retourne la fonction)
  };
}