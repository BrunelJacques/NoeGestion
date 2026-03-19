import ErrorIllustration from '../../../assets/erreur_404.jpg';
import { useTheme } from '../../../hooks/index.tsx';
import * as s from './error.css.ts';

export function Error() {

  const { theme } = useTheme(); // "light" | "dark"
  console.log('Current theme in Error component:', theme);

  return (
    <div className={s.wrapper}>
      <h1 className={s.title[theme]}>Oups...</h1>

      <img
        src={ErrorIllustration}
        alt="Erreur 404"
        className={s.illustration}
      />

      <h2 className={s.subtitle[theme]}>
        Il semblerait que la page que vous cherchez n’existe pas
      </h2>
    </div>
  );
}

export default Error;
