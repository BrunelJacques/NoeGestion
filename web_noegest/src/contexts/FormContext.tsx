// src/ui/FormContext.tsx
import { createContext, useContext, useRef, useImperativeHandle } from "react";

type ValidateFn = () => boolean;

interface FormContextType {
  registerValidator: (id: string, validateFn: ValidateFn) => () => void;
}

const FormContext = createContext<FormContextType | null>(null);

export function useFormValidation() {
  return useContext(FormContext);
}

interface ProviderProps {
  children: React.ReactNode;
  // On accepte une ref pour que le parent puisse appeler directement validateAll si besoin
  formRef?: React.RefObject<{ validateAll: () => boolean } | null>;
}

export function FormValidationProvider({ children, formRef }: ProviderProps) {
  // On utilise une Map pour stocker les fonctions de validation
  const validatorsRef = useRef<Map<string, ValidateFn>>(new Map());

  const registerValidator = (id: string, validateFn: ValidateFn) => {
    validatorsRef.current.set(id, validateFn);
    // Retourne une fonction de nettoyage pour désenregistrer le composant s'il est démonté (ex: isPageArticle passe à false)
    return () => {
      validatorsRef.current.delete(id);
    };
  };

  // Méthode pour déclencher toutes les validations d'un coup
  const validateAll = (): boolean => {
    let isValid = true;
    validatorsRef.current.forEach((validate) => {
      const childValid = validate();
      if (!childValid) isValid = false;
    });
    return isValid;
  };

  // Si une ref est passée par le parent, on lui attache la méthode validateAll
  useImperativeHandle(formRef, () => ({
    validateAll
  }), []);

  return (
    <FormContext.Provider value={{ registerValidator }}>
      {/* On ne met plus de balise <form> ici !
        On utilise un simple Fragment ou une div pour ne pas casser le HTML
      */}
      {children}
    </FormContext.Provider>
  );
}