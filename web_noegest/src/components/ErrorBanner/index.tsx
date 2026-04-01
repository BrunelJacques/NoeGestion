// src/components/Error/index.tsx
import { useTheme } from '../../hooks/useTheme.tsx';
import * as s from './index.css.ts';
import { useError } from '../../contexts/ErrorContext.tsx';
import interroge from '../../assets/icons/interroge.png';


export default function ErrorBanner() {
  const { error, clearError } = useError();
  const { theme } = useTheme(); // "light" | "dark"
  if (!error) return null;

  return (
    <div className={s.wrapper}>
      <div className={s.illustration}>
        <img
          src={interroge}
          alt="icone interrogation"
          
        /> 
      </div>
      <div className={s.title[theme]}>         
        <h4>  
          Nous avons un problème !
        </h4>
        {error}
        <button className={s.closeButton} onClick={clearError}>X</button>
      </div>
    </div>
  );
}

