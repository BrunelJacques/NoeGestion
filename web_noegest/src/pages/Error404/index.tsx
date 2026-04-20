// src/pages/Error404.tsx

import ErrorIllustration from '../../assets/images/erreur_404.jpg';
import { useTheme } from '../../hooks/useTheme.tsx';
import * as s from './index.css.ts';

export function Error404() {

  const { theme } = useTheme(); // "light" | "dark"
  console.log('Current theme in Error component:', theme);

  return (
    <div className={s.wrapper}>
      <h4 className={s.description[theme]}>
        Il semblerait que la page que vous cherchez n’existe pas
      </h4>

      <img
        src={ErrorIllustration}
        alt="Erreur 404"
        className={s.illustration}
      />

    </div>
  );
}

export default Error404;
