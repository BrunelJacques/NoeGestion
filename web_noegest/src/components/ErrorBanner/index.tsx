// src/components/Error/index.tsx
import { useTheme } from '../../hooks/useTheme.tsx';
import * as s from './index.css.ts';
import { errorStyle }  from '../../assets/styles/utilities.css.ts';
import { useError } from '../../contexts/ErrorContext.tsx';
import interroge from '../../assets/icons/interroge.png';


export default function ErrorBanner() {
  const { error, clearError } = useError();
  const { theme } = useTheme(); // "light" | "dark"
  if (!error) return null;

  return (
    <div className={`${errorStyle} ${s.wrapper}`}>
      <div>
        <img
          src={interroge}
          alt="icone interrogation"
          className={s.illustration}
        />              
        <h4 className={s.subtitle[theme]}>  
          Nous avons un problème !
        </h4>
      </div>
      {error}
      <button className={s.closeButton} onClick={clearError}>X</button>
    </div>
  );
}

